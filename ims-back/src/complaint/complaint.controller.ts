import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  RoleSerialize,
  Serialize,
} from 'src/interceptors/serialize.interceptor';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { Role } from 'src/user/decorators/user-role.decorator';
import { User } from 'src/user/entity/user.entity';
import { Roles } from 'src/user/enums/roles.enum';
import { RolesGuard } from 'src/user/guards/role.gaurd';
import { ComplaintService } from './complaint.service';
import { CreateCompalintDto } from './dtos/create-complaint.dto';
import { GetComplaintsDto } from './dtos/get-complaints-dto';
import { updateComplaintStatusDto } from './dtos/update-complaint-status.dto';
import { GetAdminsComplaintsDto } from './dtos/get-admins-complain.dtos';

@Controller('complaint')
export class ComplaintController {
  constructor(private complaintService: ComplaintService) {}
  @Post()
  @Role(Roles.Employee, Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  createComplaint(
    @Body() createComplaintDto: CreateCompalintDto,
    @GetUser() user: User,
  ) {
    return this.complaintService.createCompliant(createComplaintDto, user);
  }

  @Get()
  @Role(Roles.SuperAdmin, Roles.Admin, Roles.Employee)
  @UseGuards(AuthGuard(), RolesGuard)
  @RoleSerialize(GetComplaintsDto, GetAdminsComplaintsDto, Roles.Admin)
  //@Serialize(GetComplaintsDto)
  getComplaints(@GetUser() user: User) {
    return this.complaintService.getComplaints(user);
  }
  @Get('count')
  @Role(Roles.SuperAdmin, Roles.Admin, Roles.Employee)
  @UseGuards(AuthGuard(), RolesGuard)
  getMonthlyComplaints(@GetUser() user: User) {
    return this.complaintService.getCount(user);
  }

  @Get('/:id')
  @Role(Roles.SuperAdmin, Roles.Admin, Roles.Employee)
  @UseGuards(AuthGuard(), RolesGuard)
  getComplaint(@Param('id', ParseIntPipe) id, @GetUser() user: User) {
    return this.complaintService.getComplaintById(id, user);
  }
  @Put('/:id')
  @Role(Roles.SuperAdmin, Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  updateComplaintStatus(
    @Param('id', ParseIntPipe) id,
    @Body() updateStatus: updateComplaintStatusDto,
    @GetUser() user: User,
  ) {
    return this.complaintService.updateComplaintStatus(id, updateStatus, user);
  }
}
