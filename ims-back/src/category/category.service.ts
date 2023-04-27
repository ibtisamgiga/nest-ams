import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository, getRepository } from 'typeorm';
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
    console.log(createCategoryDto);
    const category = new Category();
    category.name = createCategoryDto.name;
    category.organizationId = user.organizationId;
    await this.CategoryRepository.save(category)
console.log(category)
    if(createCategoryDto.subCategories){
      createCategoryDto.subCategories.forEach(async (subCat)=>{
        
        const subCategory = this.CategoryRepository.create({ name: subCat, parent:category, organizationId : user.organizationId})
        console.log(subCategory)
        await this.CategoryRepository.save(subCategory)
      })
      
    }
    // if (createCategoryDto.parentId) {
    //   const parentCategory = await this.CategoryRepository.findOneBy({
    //     id: createCategoryDto.parentId,
    //     organizationId: user.organizationId,
    //   });
    //   if (!parentCategory)
    //     throw new NotFoundException('category doesnot exist');
    //   category.parent = parentCategory;
    // }
    return category;
  }


  // async create(data: CreateCategoryDto, loggedInUser: any) {
  //   const user =  await this.userService.findOne(loggedInUser.id)
  //   const category = this.repo.create({name: data.name, organization: user.organization})
  //   await this.repo.save(category)

  //   if(data.subCategories){
  //     data.subCategories.forEach(async (subCat)=>{
  //       const subCategory = this.repo.create({ name: subCat.name, parent: category, organization: user.organization })
  //       await this.repo.save(subCategory)
  //     })
  //   }
  //   return category;
  // }

  async getCategories(user: User) {

   const categories=await this.CategoryRepository.find({
      relations: ['children', 'vendors', 'parent','children.vendors','children.items'],
      where: { organizationId: user.organizationId },
    });

    // const category =categories.filter(
    //   (obj) => obj.parent === null
    // );
    // category.map((cat) => {
    //   console.log({
    //     id:cat.id,
    //     name:cat.name,
    //     subNo:cat.children.length,
    //     vedNo:cat.children.map((sub)=>{
    //      return sub.vendors

    //     }),

    //   });
  //   const result =  await this.CategoryRepository.createQueryBuilder("cat")
  //   .select("cat.name")
  //   .addSelect("COUNT(DISTINCT sub.id)", "sub_cat")
  //   .addSelect("COUNT(DISTINCT v.id)", "vendors")
  //   .innerJoin(Category, "sub", "sub.parentId = cat.id")
  //   .innerJoin("sub.vendors", "v")
  //   .where("cat.organizationId = :organizationId", { organizationId: user.organizationId })
  //   .groupBy("cat.id")
  //   .getRawMany()
  //   console.log(result)


  // const data = await this.CategoryRepository.createQueryBuilder("cat")
  // .select("cat.name")
  // .addSelect("sub.name", "sub_cat")
  // .addSelect("v.name", "vendors")
  // .innerJoin(Category, "sub", "sub.parentId = cat.id")
  // .innerJoin("sub.vendors", "v")
  // .where("cat.organizationId = :organizationId", { organizationId: user.organizationId })
  // .groupBy("cat.id, sub.id, v.id")
  // .getRawMany();
  // console.log(data)
  const data = await this.CategoryRepository.createQueryBuilder("cat")
  .select('')
  .select("cat.name", "cat_name")
  .addSelect("cat.id", "cat_id")
  .addSelect("sub.name", "sub_cat_name")
  .addSelect("sub.id", "subCat_id")
  .addSelect("v.name", "vendor_name")
  .addSelect("v.id", "vendor_id")
  .innerJoin(Category, "sub", "sub.parentId = cat.id")
  .innerJoin("sub.vendors", "v")
  .where("cat.organizationId = :organizationId", { organizationId: user.organizationId })
  .orderBy("cat.name, sub.name, v.name")
  .getRawMany();


//console.log(data);
    return  categories
  }

  async getCategoryById(id: number, user: User) {
    const category = await this.CategoryRepository.findOne({
      where: { id, organizationId: user.organizationId },
      relations: ['children', 'vendors', 'parent'],
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
      }) //"user.rolesId = :rolesId", { rolesId: 2 }
      .groupBy('month')
      .getRawMany();

    const currentMonth = await this.CategoryRepository.createQueryBuilder(
      'category',
    )
      .select(
        
        "To_CHAR(TO_DATE(EXTRACT(MONTH FROM DATE_TRUNC('month',category.created_at))::text,'MM'),'Mon')AS month,count(*)",
      )
      .where('category.organizationId = :organizationId', {
        organizationId: currentUser.organizationId,
      })
      .andWhere(
        'EXTRACT(MONTH from category.created_at) = EXTRACT(MONTH from now())',
      )
      .groupBy('month')
      .getRawOne();
    return { monthlyCount, currentMonth };
  }
}
