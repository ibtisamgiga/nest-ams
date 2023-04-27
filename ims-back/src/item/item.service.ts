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

  async getItems(user: User) {
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
    let newDate = new Date()
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
    item.assigned_by=currentUser.name
    item.assigined_at=newDate
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
    const monthlyCount = await this.ItemRepository.createQueryBuilder('item')
      .select(
        "To_CHAR(TO_DATE(EXTRACT(MONTH FROM DATE_TRUNC('month',item.created_at))::text,'MM'),'Mon')AS month,t3.name as cat,count(*),item.assigned_to as assignedTo",
      )
      .innerJoin(Category, 't2', 't2.id = item.categoryId') //INNER JOIN table2 t2 ON t1.id = t2.id
      .innerJoin(Category, 't3', 't3.id = t2.parentId')
      .where('t2.organizationId= :organizationId', {
        organizationId: currentUser.organizationId,
      }) //"user.rolesId = :rolesId", { rolesId: 2 }
      .groupBy('cat,month,assignedTo')
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
    return { monthlyCount, currentCount };
  }
}
