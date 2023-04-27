import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { User } from 'src/user/entity/user.entity';
import { ArrayContains, Repository } from 'typeorm';
import { CreateVendorDto } from './dtos/create-vendor.dto';
import { Vendor } from './entity/vendor.entity';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private VendorRepository: Repository<Vendor>,
    private categoryService: CategoryService,
  ) {}

  async createVendor(createVendorDto: CreateVendorDto) {
    const { name, contactNumber, categoryIds } = createVendorDto;
    //const { categoryIds, ...vendorData } = createVendorDto
    const categories = await this.categoryService.findByIds(categoryIds);
    if (categories.length == 0)
      throw new BadRequestException('invalid sub-category/category');
    const vendor = this.VendorRepository.create({
      name,
      contactNumber,
      categories,
    });
    // Create vendor entity with categories
    return await this.VendorRepository.save(vendor);
  }

  async getVendors(user: User) {
    const vendors = await this.VendorRepository.find({
      relations: ['categories', 'categories.parent','items'],
      where: { categories: { organizationId: user.organizationId } },
    });
    return vendors;
  }
  async getVendor(id: number, user: User) {
    const vendor = await this.VendorRepository.findOne({
      relations: ['categories', 'categories.parent','items'],
      where: { id, categories: { organizationId: user.organizationId } },
      order: { items:{created_at: 'DESC'} },
    });
    if (!vendor) throw new NotFoundException('vendor not found');
    return vendor;
  }

  async getCount(user: User) {
    const totalCount = await this.VendorRepository.count({
      relations: ['categories', 'categories.organization'],
      where: { categories: { organization: { id: user.organizationId } } },
    });
    const currentMonth = await this.VendorRepository.createQueryBuilder(
      'vendor',
    )
      .select(
        "To_CHAR(TO_DATE(EXTRACT(MONTH FROM DATE_TRUNC('month',vendor.created_at))::text,'MM'),'Mon')AS month,count(*)",
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

    return { totalCount, currentMonth };
  }
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
