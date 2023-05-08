import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entity/category.entity';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { AssiginItemDto } from './dtos/assign-item.dto';
import { CreateItemDto } from './dtos/create-item.dto';
import { Item } from './entity/item.entity';
import { UpdateItemDto } from './dtos/update-item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private ItemRepository: Repository<Item>,
  ) {}

  async createItem(createItemDto: CreateItemDto) {
    const item = this.ItemRepository.create(createItemDto);
    try {
      return await this.ItemRepository.save(item);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getItems(user: User, type) {
    if (type == 'Faulty') {
      return await this.ItemRepository.find({
        relations: ['vendor', 'category', 'category.parent', 'user'], //'vendor.categories'
        where: {
          category: { organizationId: user.organizationId },
          userId: user.id,
        },
      });
    }
    if (type == 'Acquisition') {
      return await this.ItemRepository.find({
        relations: ['vendor', 'category', 'category.parent', 'user'], //'vendor.categories'
        where: {
          category: { organizationId: user.organizationId },
          assigned_to: false,
        },
      });
    }
    return await this.ItemRepository.find({
      relations: ['vendor', 'category', 'category.parent', 'user'], //'vendor.categories'
      where: { category: { organizationId: user.organizationId } },
    });
  }

  async getItemById(id: number, user: User) {
    const item = await this.ItemRepository.findOne({
      relations: ['vendor', 'category', 'category.parent', 'user'],
      where: { id, category: { organizationId: user.organizationId } },
    });
    if (!item) {
      throw new NotFoundException('Item Not Found');
    }
    return item;
  }

  async deleteItem(id: number, user: User) {
    const item = await this.getItemById(id, user);
    if (!item) throw new NotFoundException('Organization Not Found');
    return {
      user: await this.ItemRepository.remove(item),
      message: 'item Deleted',
    };
  }

  async assiginItem(id: number, attrs: AssiginItemDto, currentUser: User) {
    let newDate = new Date();
    const { userId } = attrs;
    const item = await this.ItemRepository.findOne({
      relations: ['vendor', 'category', 'category.parent'], //'vendor.categories'
      where: { id, category: { organizationId: currentUser.organizationId } },
    });
    if (!item) {
      throw new NotFoundException('Item Not Found');
    }
    item.userId = userId;
    item.assigned_to = true;
    item.assigned_by = currentUser.name;
    item.assigined_at = newDate;
    return {
      user: await this.ItemRepository.save(item),
      message: 'item assigned',
    };
  }

  async unAssiginItem(id: number, currentUser: User) {
    const item = await this.ItemRepository.findOne({
      relations: ['vendor', 'category', 'category.parent'], //'vendor.categories'
      where: { id, category: { organizationId: currentUser.organizationId } },
    });
    if (!item) {
      throw new NotFoundException('Item Not Found');
    }
    item.userId = null;
    item.assigned_to = false;
    return {
      user: await this.ItemRepository.save(item),
      message: 'item unassigned',
    };
  }

  async getCount(currentUser: User) {
    const role = currentUser.rolesId == 1 ? 2 : 3;

    const monthlyCount = await this.ItemRepository.createQueryBuilder('item')
      .select('category.name As category')
      .addSelect(
        'COUNT(CASE WHEN item.assigned_to is true THEN 1 ELSE NULL END)',
        'Assigned',
      )
      .addSelect(
        'COUNT(CASE WHEN item.assigned_to is false THEN 1 ELSE NULL END)',
        'Unassigned',
      )
      .innerJoin('item.category', 'subCategory')
      .innerJoin('subCategory.parent', 'category')
      .innerJoin('category.organization', 'org')
      .where(`org.id= ${currentUser.organizationId}`)
      .groupBy('category.name')
      .orderBy('COUNT(item.assigned_to)', 'ASC')
      .getRawMany();

    const currentCount = await this.ItemRepository.createQueryBuilder('item')
      .select(
        "To_CHAR(TO_DATE(EXTRACT(MONTH FROM DATE_TRUNC('month',item.created_at))::text,'MM'),'Mon')AS month,count(*)",
      ) //item.name as itemName,t2.name,//t3.name as cat,count(*)

      .innerJoin(Category, 't2', 't2.id = item.categoryId')
      .innerJoin(Category, 't3', 't3.id = t2.parentId')
      .where('t2.organizationId= :organizationId', {
        organizationId: currentUser.organizationId,
      }) //"user.rolesId = :rolesId", { rolesId: 2 }
      .andWhere(
        'EXTRACT(MONTH from item.created_at) = EXTRACT(MONTH from now())',
      )
      .groupBy('month')
      .getRawOne();

    const total = await this.ItemRepository.count({
      relations: ['category', 'category.organization'],
      where: { category: { organizationId: currentUser.organizationId } },
    });
    return { monthlyCount, currentCount, total };
  }

  async updateItem(id: number, attrs: UpdateItemDto, currentUser: User) {
    //  const role = currentUser.roles.role == 'superadmin' ? 'admin' : 'employee';
    const item = await this.ItemRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Item Not Found');
    }

    Object.assign(item, attrs);
    return {
      item: await this.ItemRepository.save(item),
      message: 'item Updated',
    };
  }
}
