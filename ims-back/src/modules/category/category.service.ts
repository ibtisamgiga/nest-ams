import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entity/user.entity';
import { IsNull, Repository, getRepository } from 'typeorm';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  /***********************CREATE-CATEGORY****************************/
  async createCategory(createCategoryDto: CreateCategoryDto, user: User) {
    const category = new Category();
    category.name = createCategoryDto.name;
    category.organizationId = user.organizationId;


    await this.categoryRepository.save(category);
    if (createCategoryDto.subCategories) {
      createCategoryDto.subCategories.forEach(async (subCat) => {
        const subCategory = this.categoryRepository.create({
          name: subCat,
          parent: category,
          organizationId: user.organizationId,
        });
        
        await this.categoryRepository.save(subCategory);
      });
    }
    return category;
  }
  /***********************GET-CATEGORIES****************************/
  async getCategories(user: User) {
    const categories = await this.categoryRepository.find({
      relations: [
        'children',
        'vendors',
        'parent',
        'children.vendors',
        'children.items',
      ],
      where: { organizationId: user.organizationId },
    });

    return categories;
  }
  /***********************GET-CATEGORY****************************/
  async getCategory(id: number, user: User) {
    const category = await this.categoryRepository.findOne({
      where: { id, organizationId: user.organizationId },
      relations: ['vendors', 'parent', 'items', 'children'],
    });
    if (!category) throw new NotFoundException('category doesnot exist');
    return category;
  }
  /***********************UPDATE-CATEGORY****************************/
  async updateCategory(id: number, updateData: UpdateCategoryDto, user: User) {
    const { organizationId } = user;
    const found = await this.categoryRepository.findOneBy({
      id,
      organizationId,
    });
    if (!found) throw new NotFoundException('category doesnot exist');

    if (updateData.subCategories) {
      updateData.subCategories.map(async (subCat) => {
        const childCategory = this.categoryRepository.create({
          name: subCat,
          organizationId,
          parent: found,
        });
        await this.categoryRepository.save(childCategory);
      });
    } else {
      found.name = updateData.name;
      await this.categoryRepository.save(found);
    }

    return { message: 'updated' };
  }

  /***********************DELETE-CATEGORY****************************/
  async deleteCategory(id: number, user: User) {
    const { organizationId } = user;
    const category = await this.categoryRepository.findOne({
      where: { id, organizationId },
    });
    if (!category) throw new NotFoundException('category doesnot exist');
    return this.categoryRepository.remove(category);
  }
  /**********************FIND-BY-IDS****************************/
  async findByIds(ids: number[]): Promise<Category[]> {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .whereInIds(ids)
      .getMany();
    return categories;
  }
  /***********************CATEGORY-COUNT****************************/
  async getCount(currentUser: User) {
    const { rolesId, organizationId } = currentUser;

    const monthlyCount = await this.categoryRepository
      .createQueryBuilder('category')
      .select(
        "TO_CHAR(DATE_TRUNC('month', category.created_at), 'Mon') AS month, count(*)",
      )
      .where({ organizationId })
      .andWhere('category.parent IS NULL')
      .groupBy("DATE_TRUNC('month', category.created_at)")
      .getRawMany();
    let total = 0;
    let currentMonthCount = null;

    const currentMonth = new Date().toLocaleString('default', {
      month: 'short',
    });

    for (let i = 0; i < monthlyCount.length; i++) {
      const entry = monthlyCount[i];
      const count = parseInt(entry.count);

      total += count;

      if (entry.month === currentMonth) {
        currentMonthCount = { month: entry.month, count };
      }
    }

    return { monthlyCount, currentMonthCount, total };
  }

  async countCategories(user: User) {
    const categories = await this.categoryRepository.find({
      relations: ['children', 'children.vendors', 'children.items'],
      where: { organizationId: user.organizationId, parent: IsNull() },
    });
    return categories;
  }
}
