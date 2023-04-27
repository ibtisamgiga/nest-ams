import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/user/decorators/user-role.decorator';
import { Roles } from 'src/user/enums/roles.enum';
import { RolesGuard } from 'src/user/guards/role.gaurd';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { User } from 'src/user/entity/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GetDepartmentsDto } from './dtos/get-departments.dto';
import { GetDepartmentDto } from './dtos/get-department.dto';

@Controller('department')
@Role(Roles.Admin)
@UseGuards(AuthGuard(), RolesGuard)
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Post()
  async createOrganization(
    @Body() createDepartmentDto: CreateDepartmentDto,
    @GetUser() user: User,
  ) {
    return await this.departmentService.createDepartment(
      createDepartmentDto,
      user,
    );
  }

  @Get()
  @Serialize(GetDepartmentsDto)
  async getDepartments(@GetUser() user: User) {
    return await this.departmentService.getDepartments(user);
  }
  @Get('/:id')
  @Serialize(GetDepartmentDto)
  getItem(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.departmentService.getDepartmentById(id,user)
  }

  @Delete('/:id')
  deleteItem(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.departmentService.deleteDepartment(id, user);
  }
}
