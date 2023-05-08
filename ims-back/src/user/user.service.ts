import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { OtpService } from 'src/otp/otp.service';
import { SendOtpDto } from 'src/otp/dtos/send-otp.dto';
import { query } from 'express';
import { PhotoService } from 'src/photo/photo.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private otpService: OtpService,
    private photoService: PhotoService,
  ) {}

  async getUsers(user: User) {
    const searchRole = user.roles.role == 'superadmin' ? 'admin' : 'employee';
    if (user.roles.role == 'admin') {
      const users = await this.userRepository.find({
        where: {
          roles: { role: searchRole },
          organizationId: user.organizationId,
        },
        relations: ['organization', 'department'],
        // relations: {
        //   organization: true,
        // },
      });
      return users;
    }
    const users = await this.userRepository.find({
      where: { roles: { role: searchRole } },
      relations: {
        organization: true,
      },
    });
    return users;
  }
  async getUserById(id: number, currentUser: User) {
    const searchRole =
      currentUser.roles.role == 'superadmin' ? 'admin' : 'employee';

    const user = await this.userRepository.findOne({
      where: {
        id,
        roles: { role: searchRole },
      },
      relations: [
        'organization',
        'items',
        'items.category.parent',
        'requests',
        'requests.item.category.parent',
        'department',
      ],
    });
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  async deleteUser(id: number, currentUser: User) {
    const role = currentUser.roles.role == 'superadmin' ? 'admin' : 'employee';
    const user = await this.userRepository.findOneBy({ id, roles: { role } });
    if (!user) throw new NotFoundException('user Not Found');
    return {
      user: await this.userRepository.remove(user),
      message: 'User Deleted',
    };
  }

  async updateUser(id: number, attrs: UpdateUserDto, currentUser: User) {
    const role = currentUser.roles.role == 'superadmin' ? 'admin' : 'employee';
    const user = await this.userRepository.findOneBy({ id, roles: { role } });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    await this.photoService.updatePhoto(attrs.image);

    Object.assign(user, attrs);
    return {
      user: await this.userRepository.save(user),
      message: 'User Updated',
    };
  }

  async findUserByemail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  async sendOtp(sendOtpDto: SendOtpDto) {
    const { email } = sendOtpDto;
    const user = await this.findUserByemail(email);
    if (!user) throw new NotFoundException('user Not found');
    return await this.otpService.sendOtp(sendOtpDto);
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
    const monthlyCount = await this.userRepository
      .createQueryBuilder('user')
      .select(
        "To_CHAR(TO_DATE(EXTRACT(MONTH FROM DATE_TRUNC('month',created_at))::text,'MM'),'Mon')AS month",
      )
      .addSelect('COUNT(*)::int  as count')
      .where(where)
      .andWhere('EXTRACT(YEAR from created_at) = EXTRACT(YEAR from now())')
      .groupBy('month')
      .getRawMany();

    const total = await this.userRepository
      .createQueryBuilder('user')
      .select('COUNT(*)::int  AS Total')
      .where(where)
      .getRawOne();

    const currentMonth = await this.userRepository
      .createQueryBuilder('user')
      .select('COUNT(*)::int  AS count')
      .where('EXTRACT(MONTH from created_at) = EXTRACT(MONTH from now())')
      .andWhere('EXTRACT(YEAR from created_at) = EXTRACT(YEAR from now())')
      .andWhere(where)
      .getRawOne();

    return { monthlyCount, currentMonth, total: total.total };
  }
}
