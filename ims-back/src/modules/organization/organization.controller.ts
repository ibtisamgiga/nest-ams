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
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GetUser } from 'src/modules/user/decorators/get-user.decorator';
import { Role } from 'src/modules/user/decorators/user-role.decorator';
import { User } from 'src/modules/user/entity/user.entity';
import { Roles } from 'src/modules/user/enums/roles.enum';
import { RolesGuard } from 'src/modules/user/guards/role.gaurd';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { GetSingleOrganizationDto } from './dtos/get-single-organization.dto';
import { UpdateOrganizationDto } from './dtos/update-organization.dto';
import { OrganizationService } from './organization.service';
import { GetOrganizationsDto } from './dtos/get-organizations.dto';

@Controller('organization')
@Role(Roles.SuperAdmin)
@UseGuards(AuthGuard(), RolesGuard)
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Post()
  async createOrganization(@Body() createOrgDto: CreateOrganizationDto) {
    return await this.organizationService.createOrganization(createOrgDto);
  }

  @Delete('/:id')
  async deleteOrganization(@Param('id', ParseIntPipe) id: number) {
    return this.organizationService.deleteOrganization(id);
  }
  @Get('count')
  getMonthlyOrganizations(@GetUser() user: User) {
    return this.organizationService.getCount();
  }

  @Get()
  @Serialize(GetOrganizationsDto)
  getOrganizations(@GetUser() user: User) {
    return this.organizationService.getOrganizations();
  }
  @Get(':id')
  @Serialize(GetSingleOrganizationDto)
  getOrganization(@Param('id') id: string, @GetUser() user: User) {
    return this.organizationService.getOrganization(+id, user);
  }

  @Patch('/:id')
  updateOrganization(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateOrganizationDto,
  ) {
    return this.organizationService.updateOrganization(id, body);
  }
}
