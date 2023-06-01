import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/modules/category/entity/category.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Repository } from 'typeorm';
import { AssiginItemDto } from './dtos/assign-item.dto';
import { CreateItemDto } from './dtos/create-item.dto';
import { Item } from './entity/item.entity';
import { UpdateItemDto } from './dtos/update-item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}
  /**********************CREATE-ITEM**************************/
  async createItem(createItemDto: CreateItemDto) {
    const item = this.itemRepository.create(createItemDto);
    try {
      return await this.itemRepository.save(item);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  /**********************GET-ITEMS**************************/
  async getItems(user: User, type) {
    const queryBuilder = this.itemRepository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.vendor', 'vendor')
      .leftJoinAndSelect('item.category', 'category')
      .leftJoinAndSelect('category.parent', 'parent')
      .leftJoinAndSelect('item.user', 'user')
      .where('category.organizationId = :organizationId', {
        organizationId: user.organizationId,
      });

    if (type === 'Faulty') {
      queryBuilder.andWhere('item.userId = :userId', { userId: user.id });
    } else if (type === 'Acquisition') {
      queryBuilder.andWhere('item.assigned_to = :assignedTo', {
        assignedTo: false,
      });
    }

    return await queryBuilder.getMany();
  }
  /**********************GET-ITEM**************************/
  async getItem(id: number, user: User) {
    const item = await this.itemRepository.findOne({
      relations: ['vendor', 'category', 'category.parent', 'user'],
      where: { id, category: { organizationId: user.organizationId } },
    });
    if (!item) {
      throw new NotFoundException('Item Not Found');
    }
    return item;
  }
  /**********************DELETE-ITEMS**************************/
  async deleteItem(id: number, user: User) {
    const item = await this.getItem(id, user);
    if (!item) throw new NotFoundException('Organization Not Found');
    return {
      user: await this.itemRepository.remove(item),
      message: 'item Deleted',
    };
  }
  /**********************ASSIGINED-ITEMS**************************/
  async assiginItem(id: number, attrs: AssiginItemDto, currentUser: User) {
    let newDate = new Date();
    const { userId } = attrs;
    const item = await this.itemRepository.findOne({
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
      user: await this.itemRepository.save(item),
      message: 'item assigned',
    };
  }
  /**********************UN-ASSIGINED-ITEMS**************************/
  async unAssiginItem(id: number, currentUser: User) {
    const item = await this.itemRepository.findOne({
      where: { id, category: { organizationId: currentUser.organizationId } },
    });
    if (!item) {
      throw new NotFoundException('Item Not Found');
    }
    item.userId = null;
    item.assigned_to = false;
    item.assigned_by = '-';
    item.assigined_at = null;
    return {
      user: await this.itemRepository.save(item),
      message: 'item unassigned',
    };
  }
  /**********************COUNT**************************/
  async getCount(currentUser: User) {
    const organizationId = currentUser.organizationId;

    const [monthlyData] = await Promise.all([
      // this.getCategoryCount(organizationId),
      this.getMonthlyCount(organizationId),
    ]);
    let totalCount = 0;
    let currentMonthCount = null;
    const currentMonthDate = new Date().toLocaleString('default', {
      month: 'short',
    });
    for (const item of monthlyData) {
      const { month, count } = item;
      totalCount += parseInt(count);
      if (month === currentMonthDate) {
        currentMonthCount = { month: currentMonthDate, count: parseInt(count) };
      }
    }

    const monthlyCount = await this.itemRepository
      .createQueryBuilder('item')
      .select('category.name As category')
      .addSelect(
        'COUNT(CASE WHEN item.assigned_to is true THEN 1 ELSE NULL END)',
        'assigned',
      )
      .addSelect(
        'COUNT(CASE WHEN item.assigned_to is false THEN 1 ELSE NULL END)',
        'unassigned',
      )
      .innerJoin('item.category', 'subCategory')
      .innerJoin('subCategory.parent', 'category')
      .innerJoin('category.organization', 'org')
      .where(`org.id= ${currentUser.organizationId}`)
      .groupBy('category.name')
      .orderBy('COUNT(item.assigned_to)', 'ASC')
      .getRawMany();

    return { monthlyCount, currentCount: currentMonthCount, total: totalCount };
  }
  /**********************Category-ITEMS**************************/
  private async getCategoryCount(organizationId: number) {
    return this.itemRepository
      .createQueryBuilder('item')
      .select('category.name AS category')
      .addSelect('COUNT(item.assigned_to = true) AS assigned')
      .addSelect('COUNT(item.assigned_to = false) AS unassigned')
      .innerJoin('item.category', 'category')
      .innerJoin('category.organization', 'org')
      .where('org.id = :organizationId', { organizationId })
      .groupBy('category.name')
      .orderBy('assigned', 'ASC')
      .getRawMany();
  }
  /**********************monthly-ITEMS**************************/
  private async getMonthlyCount(organizationId: number) {
    return this.itemRepository
      .createQueryBuilder('item')
      .select(
        "To_CHAR(TO_DATE(EXTRACT(MONTH FROM DATE_TRUNC('month', item.created_at))::text,'MM'),'Mon') AS month, COUNT(*)",
      )
      .innerJoin('item.category', 'category')
      .innerJoin('category.organization', 'org')
      .where('org.id = :organizationId', { organizationId })
      .groupBy('month')
      .getRawMany();
  }

  /**********************update-ITEMS**************************/
  async updateItem(id: number, attrs: UpdateItemDto, currentUser: User) {
    const item = await this.itemRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Item Not Found');
    }
    Object.assign(item, attrs);
    return {
      item: await this.itemRepository.save(item),
      message: 'item Updated',
    };
  }
}
