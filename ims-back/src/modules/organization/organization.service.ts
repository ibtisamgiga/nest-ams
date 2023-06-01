import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { UpdateOrganizationDto } from './dtos/update-organization.dto';
import { Organization } from './entity/organization.entity';
import { PhotoService } from 'src/modules/photo/photo.service';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    private photoService: PhotoService,
  ) {}

  async createOrganization(organizationData: CreateOrganizationDto) {
    const { image, ...data } = organizationData;

    const myImage = image
      ? await this.photoService.createPhoto({ image })
      : null;

    try {
      return await this.organizationRepository.save({
        ...data,
        image: myImage,
      });
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('organization already exists');
      }

      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async deleteOrganization(id: number) {
    const organization = await this.organizationRepository.findOneBy({ id });
    if (!organization) throw new NotFoundException('Organization Not Found');
    return {
      user: await this.organizationRepository.remove(organization),
      message: 'organization Deleted',
    };
  }

  async getOrganizations() {
    const organizations = await this.organizationRepository.find({
      relations: ['image'],
    });
    return organizations;
  }

  async getOrganization(id: number, user: User) {
    const organization = await this.organizationRepository.findOne({
      where: { id }, //users: { rolesId: 2 }
      relations: ['users'],
    });
    if (!organization)
      throw new NotFoundException('organization doesnot exist');
    return organization;
  }

  async updateOrganization(id: number, attrs: UpdateOrganizationDto) {
    const organization = await this.organizationRepository.findOneBy({ id });
    if (!organization) {
      throw new NotFoundException('organization Not Found');
    }
    await this.photoService.updatePhoto(attrs.image);
    Object.assign(organization, attrs);
    return {
      organization: await this.organizationRepository.save(organization),
      message: 'Organization Updated',
    };
  }

  async getCount() {
    const monthlyCount = await this.getMonthlyCount();

    const currentDate = new Date();
    const currentMonthDate = currentDate.toLocaleString('default', {
      month: 'short',
    });

    let total = 0;
    let currentMonth = null;

    for (const entry of monthlyCount) {
      total += entry.count;

      if (entry.month === currentMonthDate) {
        currentMonth = { month: entry.month, count: entry.count };
      }
    }
    return { monthlyCount, currentMonth, total };
  }

  private async getMonthlyCount() {
    return await this.organizationRepository
      .createQueryBuilder('organization')
      .select(
        "To_CHAR(TO_DATE(EXTRACT(MONTH FROM DATE_TRUNC('month',organization.created_at))::text,'MM'),'Mon')AS month,count(*)",
      )
      .addSelect('COUNT(*)::int as count')
      .andWhere('EXTRACT(YEAR from created_at) = EXTRACT(YEAR from now())')
      .groupBy('month')
      .getRawMany();
  }
}
