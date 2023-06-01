import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateCompalintDto } from './dtos/create-complaint.dto';
import { updateComplaintStatusDto } from './dtos/update-complaint-status.dto';
import { Complaint } from './entity/complaint.entity';
import { PhotoService } from 'src/modules/photo/photo.service';
import { RoleService } from '../role/role.service';

@Injectable()
export class ComplaintService {
  constructor(
    @InjectRepository(Complaint)
    private complaintRepository: Repository<Complaint>,
    private photoService: PhotoService,
    private roleService: RoleService,
  ) {}
  /************************************CREATE-COMPLAINT*************/
  async createCompliant(createComplaintDto: CreateCompalintDto, user: User) {
    const { description, images } = createComplaintDto;
    const compalint = this.complaintRepository.create({
      images,
      description,
      userId: user.id,
    });
    try {
      const photos = [];
      if (images) {
        for (const image of images) {
          photos.push(await this.photoService.createPhoto({ image }));
        }
        compalint.images = photos;
      }
      return await this.complaintRepository.save(compalint);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  /************************************GET-COMPLAINTS*************/
  async getComplaints(user: User) {
    const role = user.roles.role == 'superadmin' ? 'admin' : 'employee';
    const organizationId =
      user.roles.role == 'admin' ? user.organizationId : null;
    const compalints = await this.complaintRepository.find({
      where: { user: { roles: { role }, organizationId } },
      relations: ['user', 'user.organization'],
      order: { submissionDate: 'DESC' },

    });
    const myCompalints = await this.complaintRepository.find({
      where: { user: { roles: { role: user.roles.role }, id: user.id } },
      relations: ['user', 'user.organization', 'user.image'],
      order: { submissionDate: 'DESC' },
    });
    if (user.roles.role == 'admin') {
      return { compalints, myCompalints };
    } else if (user.roles.role == 'employee') {
      return { compalints: myCompalints };
    }
    return { compalints };
  }
  /************************************GET-COMPLAINT*************/
  async getComplaint(id: number, user: User) {
    const organizationId =
      user.roles.role == 'admin' ? user.organizationId : null;
    const complaint = await this.complaintRepository.findOne({
      where: { id }, // user: { role: role, organizationId }
      relations: ['user', 'user.organization', 'user.image', 'images'],
    });
    if (!complaint) throw new NotFoundException('complaint Not Found');
    return complaint;
  }
  /************************************UPDATE-COMPLAINTS*************/
  async updateComplaint(
    id: number,
    updatedStatus: updateComplaintStatusDto,
    user: User,
  ) {
    const { status } = updatedStatus;
    const complaint = await this.getComplaint(id, user);
    complaint.status = status;
    return await this.complaintRepository.save(complaint);
  }

  /************************************COUNT-COMPLAINTS*************/
  async getCount(currentUser: User) {
    const role = currentUser.roles.role == 'superadmin' ? 'admin' : 'employee';
    const roleId = await this.roleService.getRole(role);
    const where = this.buildWhereClause(currentUser, roleId);

    const monthlyCount = await this.getMonthlyCount(where, currentUser);
    let totalPending = 0;
    let totalResolved = 0;
    let currentMonthPending = 0;
    let currentMonthResolved = 0;
    const currentDate = new Date();
    const currentMonthDate = currentDate.toLocaleString('default', {
      month: 'short',
    });
    monthlyCount.forEach((entry) => {
      if (entry.month === currentMonthDate) {
        if (entry.status === 'Pending') {
          currentMonthPending += entry.count;
        } else if (entry.status === 'Resolved') {
          currentMonthResolved += entry.count;
        }
      }

      if (entry.status === 'Pending') {
        totalPending += entry.count;
      } else if (entry.status === 'Resolved') {
        totalResolved += entry.count;
      }
    });

    const total = { Pending: totalPending, Resolved: totalResolved };
    const currentMonth = {
      Pending: currentMonthPending,
      Resolved: currentMonthResolved,
    };
    return {
      monthlyCount,
      currentMonth,
      total,
    };
  }

  /***************PRIVATE-METHODS*************** */
  private buildWhereClause(currentUser: User, role: any): string {
    if (currentUser.roles.role == 'superadmin') {
      return `user.rolesId = ${role}`;
    } else {
      return `user.rolesId = ${role} AND user.organizationId = ${currentUser.organizationId}`;
    }
  }

  private async getMonthlyCount(where: string, currentUser: User) {
    if (currentUser.roles.role == 'superadmin') {
      return await this.complaintRepository
        .createQueryBuilder('complaint')
        .select(
          "TO_CHAR(TO_DATE(EXTRACT(MONTH FROM DATE_TRUNC('month',complaint.created_at))::text,'MM'),'Mon')AS month,status,count(*):: int",
        )
        .innerJoin(User, 'user', 'user.id= complaint.userId')
        .where(where)
        .groupBy('status,month')
        .getRawMany();
    } else {
      return await this.complaintRepository
        .createQueryBuilder('complaint')
        .select(
          "TO_CHAR(TO_DATE(EXTRACT(Month from complaint.created_at)::text, 'MM'), 'Mon') AS month",
        )
        .addSelect(
          "COUNT(CASE WHEN complaint.status = 'Pending' THEN 1 ELSE NULL END)",
          'Pending',
        )
        .addSelect(
          "COUNT(CASE WHEN complaint.status = 'Resolved' THEN 1 ELSE NULL END)",
          'Resolved',
        )
        .innerJoin(User, 'user', 'user.id = complaint.userId')
        .where(where)
        .groupBy('month')
        .getRawMany();
    }
  }
}
