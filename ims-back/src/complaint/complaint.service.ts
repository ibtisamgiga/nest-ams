import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateCompalintDto } from './dtos/create-complaint.dto';
import { updateComplaintStatusDto } from './dtos/update-complaint-status.dto';
import { Complaint } from './entity/complaint.entity';
import { PhotoService } from 'src/photo/photo.service';

@Injectable()
export class ComplaintService {
  constructor(
    @InjectRepository(Complaint)
    private ComplaintRepository: Repository<Complaint>,
    private photoService: PhotoService,
  ) {}

  async createCompliant(createComplaintDto: CreateCompalintDto, user: User) {
    const { description, images } = createComplaintDto;

    const compalint = this.ComplaintRepository.create({
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
      return await this.ComplaintRepository.save(compalint);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getComplaints(user: User) {
    const role = user.roles.role == 'superadmin' ? 'admin' : 'employee';
    const organizationId =
      user.roles.role == 'admin' ? user.organizationId : null;
    const compalints = await this.ComplaintRepository.find({
      where: { user: { roles: { role }, organizationId } },
      relations: ['user', 'user.organization'],
    });
    const myCompalints = await this.ComplaintRepository.find({
      where: { user: { roles: { role: user.roles.role }, id: user.id } },
      relations: ['user', 'user.organization', 'user.image'],
    });
    if (user.roles.role == 'admin') {
      return { compalints, myCompalints };
    } else if (user.roles.role == 'employee') {
      return {myCompalints};
    }
    return {compalints};
  }

  async getComplaintById(id: number, user: User) {
    const organizationId =
      user.roles.role == 'admin' ? user.organizationId : null;
    const complaint = await this.ComplaintRepository.findOne({
      where: { id }, // user: { role: role, organizationId }
      relations: ['user', 'user.organization', 'user.image'],
    });
    if (!complaint) throw new NotFoundException('complaint Not Found');
    return complaint;
  }

  async updateComplaintStatus(
    id: number,
    updatedStatus: updateComplaintStatusDto,
    user: User,
  ) {
    const { status } = updatedStatus;
    const complaint = await this.getComplaintById(id, user);
    complaint.status = status;
    return await this.ComplaintRepository.save(complaint);
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

    const monthlyCount = await this.ComplaintRepository.createQueryBuilder(
      'complaint',
    )
      .select(
        "To_CHAR(TO_DATE(EXTRACT(MONTH FROM DATE_TRUNC('month',complaint.created_at))::text,'MM'),'Mon')AS month,status,count(*):: int",
      )
      .innerJoin(User, 'user', 'user.id= complaint.userId')
      .where(where) //"user.rolesId = :rolesId", { rolesId: 2 }
      .groupBy('status,month')
      .getRawMany();

    const currentMonth = await this.ComplaintRepository.createQueryBuilder(
      'complaint',
    )
      .select(
        "To_CHAR(TO_DATE(EXTRACT(MONTH FROM DATE_TRUNC('month',complaint.created_at))::text,'MM'),'Mon')AS month,status,count(*)::int ",
      )
      .innerJoin(User, 'user', 'user.id= complaint.userId')
      .where(where) //"user.rolesId = :rolesId", { rolesId: 2 }
      .andWhere(
        'EXTRACT(MONTH from complaint.created_at) = EXTRACT(MONTH from now())',
      )
      .groupBy('status,month')
      .getRawMany();

    const total = await this.ComplaintRepository.createQueryBuilder('complaint')
      .select('status,count(*):: int')
      .innerJoin(User, 'user', 'user.id= complaint.userId')
      .where(where) //"user.rolesId = :rolesId", { rolesId: 2 }
      .groupBy('status')
      .getRawMany();
 
    const currentMonthData =
      currentMonth.length == 1
        ? currentMonth[0].status == 'Resolved'
          ? { Resolved: currentMonth[0].count, Pending: 0 }
          : { Pending: currentMonth[0].count, Resolved: 0 }
        : {
            Pending: currentMonth[0]?.count,
            Resolved: currentMonth[1]?.count,
          };
    const totalData =
      total.length == 1
        ? total[0].status == 'Resolved'
          ? { Resolved: total[0].count, Pending: 0 }
          : { Pending: total[0].count, Resolved: 0 }
        : {
            Pending: total[0]?.count,
            Resolved: total[1]?.count,
          };
  
    return {
      monthlyCount,
      currentMonth: currentMonthData,
      total: totalData,
    };
  }
}
