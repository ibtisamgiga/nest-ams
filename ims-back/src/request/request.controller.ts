import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { Role } from 'src/user/decorators/user-role.decorator';
import { User } from 'src/user/entity/user.entity';
import { Roles } from 'src/user/enums/roles.enum';
import { RolesGuard } from 'src/user/guards/role.gaurd';
import { CreateRequestDto } from './dtos/create-request.dto';
import { RequestService } from './request.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GetRequestsDto } from './dtos/get-requests.dto';

@Controller('request')
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Post()
  @Role(Roles.Employee)
  @UseGuards(AuthGuard(), RolesGuard)
  createrequest(
    @Body() createRequestDto: CreateRequestDto,
    @GetUser() user: User,
  ) {
    return this.requestService.createRequest(createRequestDto, user);
  }

  @Get()
  @Role(Roles.Employee, Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  @Serialize(GetRequestsDto)
  getRequests(@GetUser() user: User) {
    return this.requestService.getRequests(user);
  }
  @Get('/:id')
  @Role(Roles.Employee, Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  getRequest(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.requestService.getRequestById(id, user);
  }
}
