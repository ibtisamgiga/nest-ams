import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/modules/category/category.service';
import { User } from 'src/modules/user/entity/user.entity';
import { ArrayContains, Repository } from 'typeorm';
import { CreateVendorDto } from './dtos/create-vendor.dto';
import { Vendor } from './entity/vendor.entity';
import { UpdateVendorDto } from './dtos/update-vendor.dto';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private VendorRepository: Repository<Vendor>,
    private categoryService: CategoryService,
  ) {}
  /*************CREATE-VENDOR*****************************/
  async createVendor(createVendorDto: CreateVendorDto) {
    const { name, contactNumber, categoryIds } = createVendorDto;

    const categories = await this.categoryService.findByIds(categoryIds);
    if (categories.length == 0)
      throw new BadRequestException('invalid sub-category/category');
    const vendor = this.VendorRepository.create({
      name,
      contactNumber,
      categories,
    });
    return await this.VendorRepository.save(vendor);
  }
  /*************UPDATE-VENDOR*****************************/
  async updateVendor(id: number, updateVendorDto: UpdateVendorDto, user: User) {
    const { name, contactNumber, categoryIds } = updateVendorDto;
    const vendor = await this.VendorRepository.findOne({
      relations: ['categories', 'categories.parent', 'items'],
      where: { id, categories: { organizationId: user.organizationId } },
      order: { items: { created_at: 'DESC' } },
    });
    if (!vendor) throw new NotFoundException('vendor not found');
    const categories = await this.categoryService.findByIds(categoryIds);
    if (categories.length == 0)
      throw new BadRequestException('invalid sub-category/category');
    vendor.name = name;
    vendor.contactNumber = contactNumber;
    let difference = categories.filter((x) => !vendor.categories.includes(x));
    difference.map((category) => {
      vendor.categories.push(category);
    });

    return await this.VendorRepository.save(vendor);
  }
  /*************GET-VENDORS*****************************/
  async getVendors(user: User) {
    const vendors = await this.VendorRepository.find({
      relations: ['categories', 'categories.parent', 'items'],
      where: { categories: { organizationId: user.organizationId } },
    });
    return vendors;
  }
  /*************GET-VENDOR*****************************/
  async getVendor(id: number, user: User) {
    const vendor = await this.VendorRepository.findOne({
      relations: ['categories', 'categories.parent', 'items'],
      where: { id, categories: { organizationId: user.organizationId } },
      order: { items: { created_at: 'DESC' } },
    });
    if (!vendor) throw new NotFoundException('vendor not found');
    return vendor;
  }
  /*************GET-COUNT****************************/
  async getCount(user: User) {
    const totalCount = await this.VendorRepository.count({
      relations: ['categories', 'categories.organization'],
      where: { categories: { organization: { id: user.organizationId } } },
    });
    const currentMonth = await this.VendorRepository.createQueryBuilder(
      'vendor',
    )
      .select(
        "To_CHAR(TO_DATE(EXTRACT(MONTH FROM DATE_TRUNC('month',vendor.created_at))::text,'MM'),'Mon')AS month,count(DISTINCT  vendor.id)",
      )
      .innerJoin('vendor.categories', 'category')
      .where('category.organizationId = :organizationId', {
        organizationId: user.organizationId,
      })
      .andWhere(
        'EXTRACT(MONTH from vendor.created_at) = EXTRACT(MONTH from now())',
      )
      .groupBy('month')
      .getRawOne();
    return { total: totalCount, currentMonth: currentMonth ? currentMonth : 0 };
  }
  /*************DELETE-VENDOR****************************/
  async deleteVendor(id: number, user: User) {
    const vendor = await this.VendorRepository.findOne({
      relations: ['categories', 'categories.parent'],
      where: { id, categories: { organizationId: user.organizationId } },
    });
    if (!vendor) throw new NotFoundException('vendor not found');
    return {
      user: await this.VendorRepository.remove(vendor),
      message: 'vendor Deleted',
    };
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async deleteVendorswithoutCategory() {
    const vendors = await this.VendorRepository.find({
      relations: ['categories', 'categories.parent'],
    });
    vendors.forEach(async (vendor) => {
      if (vendor.categories.length == 0) {
        return await this.VendorRepository.remove(vendor);
      }
    });

    return vendors;
  }
}
