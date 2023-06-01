import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/modules/user/decorators/user-role.decorator';
import { Roles } from 'src/modules/user/enums/roles.enum';
import { RolesGuard } from 'src/modules/user/guards/role.gaurd';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { GetUser } from 'src/modules/user/decorators/get-user.decorator';
import { User } from 'src/modules/user/entity/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GetDepartmentsDto } from './dtos/get-departments.dto';
import { GetDepartmentDto } from './dtos/get-department.dto';
import { UpdateDepartmentDto } from './dtos/update-department.dto';

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
  getDepartment(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.departmentService.getDepartment(id, user);
  }

  @Delete('/:id')
  deleteDepartment(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    return this.departmentService.deleteDepartment(id, user);
  }

  @Patch('/:id')
  updateDepartment(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateDepartmentDto,
    @GetUser() user: User,
  ) {
    return this.departmentService.updateDepartment(id, body, user);
  }
}
