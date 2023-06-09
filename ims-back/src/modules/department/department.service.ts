import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entity/department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { User } from 'src/modules/user/entity/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GetDepartmentDto } from './dtos/get-department.dto';
import { UpdateDepartmentDto } from './dtos/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async createDepartment(createDepartmentDto: CreateDepartmentDto, user: User) {
    const { name, contactNo, email } = createDepartmentDto;
    const department = this.departmentRepository.create({
      name,
      contactNo,
      email,
      organizationId: user.organizationId,
    });
    try {
      return await this.departmentRepository.save(department);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async getDepartments(user: User) {
    const { organizationId } = user;
    const departments = await this.departmentRepository.find({
      where: { organizationId },
    });
    return departments;
  }

  async getDepartment(id: number, user: User) {
    const { organizationId } = user;
    const department = await this.departmentRepository.findOne({
      where: { id }, // user: { role: role, organizationId }
      relations: ['organization'],
    });
    if (!department) {
      throw new NotFoundException('Department Not Found');
    }
    return department;
  }

  async deleteDepartment(id: number, user: User) {
    const department = await this.getDepartment(id, user);
    if (!department) throw new NotFoundException('Department Not Found');
    return {
      user: await this.departmentRepository.remove(department),
      message: 'Department Deleted',
    };
  }
  async updateDepartment(
    id: number,
    attrs: UpdateDepartmentDto,
    currentUser: User,
  ) {
    const department = await this.departmentRepository.findOneBy({ id });
    if (!department) {
      throw new NotFoundException('department Not Found');
    }
    Object.assign(department, attrs);
    return {
      department: await this.departmentRepository.save(department),
      message: 'deparment Updated',
    };
  }
}
