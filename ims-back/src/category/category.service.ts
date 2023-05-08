import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { IsNull, Repository, getRepository } from 'typeorm';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, user: User) {
    const category = new Category();
    category.name = createCategoryDto.name;
    category.organizationId = user.organizationId;
    await this.CategoryRepository.save(category);

    if (createCategoryDto.subCategories) {
      createCategoryDto.subCategories.forEach(async (subCat) => {
        const subCategory = this.CategoryRepository.create({
          name: subCat,
          parent: category,
          organizationId: user.organizationId,
        });

        await this.CategoryRepository.save(subCategory);
      });
    }

    return category;
  }

  async getCategories(user: User) {
    const categories = await this.CategoryRepository.find({
      relations: [
        'children',
        'vendors',
        'parent',
        'children.vendors',
        'children.items',
      ],
      where: { organizationId: user.organizationId },
    });

    const data = await this.CategoryRepository.createQueryBuilder('cat')
      .select('')
      .select('cat.name', 'cat_name')
      .addSelect('cat.id', 'cat_id')
      .addSelect('sub.name', 'sub_cat_name')
      .addSelect('sub.id', 'subCat_id')
      .addSelect('v.name', 'vendor_name')
      .addSelect('v.id', 'vendor_id')
      .innerJoin(Category, 'sub', 'sub.parentId = cat.id')
      .innerJoin('sub.vendors', 'v')
      .where('cat.organizationId = :organizationId', {
        organizationId: user.organizationId,
      })
      .orderBy('cat.name, sub.name, v.name')
      .getRawMany();

    return categories;
  }

  async getCategoryById(id: number, user: User) {
    const category = await this.CategoryRepository.findOne({
      where: { id, organizationId: user.organizationId },
      relations: ['vendors', 'parent', 'items'],
    });
    if (!category) throw new NotFoundException('category doesnot exist');
    return category;
  }
  async updateSubcategory(
    id: number,
    updateData: UpdateCategoryDto,
    user: User,
  ) {
    const { organizationId } = user;
    const found = await this.CategoryRepository.findOneBy({
      id,
      organizationId,
    });
    if (!found) throw new NotFoundException('category doesnot exist');
    const parentCategory = await this.CategoryRepository.findOne({
      where: { id },
    });
    const childCategory = this.CategoryRepository.create({
      name: updateData.name,
      organizationId,
      parent: parentCategory,
    });
    return this.CategoryRepository.save(childCategory);
  }

  async deleteCategory(id: number, user: User) {
    const { organizationId } = user;
    const category = await this.CategoryRepository.findOne({
      where: { id, organizationId },
      relations: { parent: true },
    });
    if (!category) throw new NotFoundException('category doesnot exist');
    if (category.parent === null) {
      const categories = await this.CategoryRepository.find({
        relations: { parent: true },
        where: [{ id }, { parent: { id } }],
      });
      return this.CategoryRepository.remove(categories);
    }
    return this.CategoryRepository.remove(category);
  }
  async findByIds(ids: number[]): Promise<Category[]> {
    const categories = await this.CategoryRepository.createQueryBuilder(
      'category',
    )
      .whereInIds(ids)
      .getMany();
    return categories;
  }

  async getCount(currentUser: User) {
    const role = currentUser.rolesId == 1 ? 2 : 3;
    const where =
      currentUser.rolesId == 1
        ? 'user.rolesId = ' + role
        : 'user.rolesId= ' +
          role +
          'AND user.organizationId = ' +
          currentUser.organizationId;

    const monthlyCount = await this.CategoryRepository.createQueryBuilder(
      'category',
    )
      .select(
        "To_CHAR(TO_DATE(EXTRACT(MONTH FROM DATE_TRUNC('month',category.created_at))::text,'MM'),'Mon')AS month,count(*)",
      )
      .where('category.organizationId = :organizationId', {
        organizationId: currentUser.organizationId,
      })
      .groupBy('month')
      .getRawMany();

    const currentMonth = await this.CategoryRepository.createQueryBuilder(
      'category',
    )
      .select('count(*)::int  AS count')
      .where('category.organizationId = :organizationId', {
        organizationId: currentUser.organizationId,
      })
      .andWhere(
        'EXTRACT(MONTH from category.created_at) = EXTRACT(MONTH from now())',
      )
      .andWhere('category.parent IS NULL')
      .getRawOne();

    const total = await this.CategoryRepository.count({
      where: { organizationId: currentUser.organizationId, parent: IsNull() },
      relations: { parent: true },
    });
    return { monthlyCount, currentMonth, total };
  }

  async countCategories(user: User) {
    const categories = await this.CategoryRepository.find({
      relations: ['children', 'children.vendors', 'children.items'],
      where: { organizationId: user.organizationId, parent: IsNull() },
    });
    return categories;
  }
}
