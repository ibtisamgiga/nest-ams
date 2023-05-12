import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/modules/user/decorators/get-user.decorator';
import { Role } from 'src/modules/user/decorators/user-role.decorator';
import { User } from 'src/modules/user/entity/user.entity';
import { Roles } from 'src/modules/user/enums/roles.enum';
import { RolesGuard } from 'src/modules/user/guards/role.gaurd';
import { CreateVendorDto } from './dtos/create-vendor.dto';
import { VendorService } from './vendor.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GetVendorsDto } from './dtos/get-vendors.dto';
import { UpdateVendorDto } from './dtos/update-vendor.dto';

@Controller('vendor')
@Role(Roles.Admin)
@UseGuards(AuthGuard(), RolesGuard)
export class VendorController {
  constructor(private vendorService: VendorService) {}

  @Post()
  createVendor(@Body() vendorData: CreateVendorDto) {
    return this.vendorService.createVendor(vendorData);
  }

  @Get()
  @Serialize(GetVendorsDto)
  getVendors(@GetUser() user: User) {
    return this.vendorService.getVendors(user);
  }
  @Get('count')
  getCount(@GetUser() user: User) {
    return this.vendorService.getCount(user);
  }
  @Get(':id')
  getVendor(@Param('id') id: string, @GetUser() user: User) {
    return this.vendorService.getVendor(+id, user);
  }
  @Patch(':id')
  async updateVendor(
    @Param('id') id: string,
    @Body() body: UpdateVendorDto,
    @GetUser() user: User,
  ) {
    return this.vendorService.updateVendor(+id, body, user);
  }
  @Delete(':id')
  deleteVendor(@Param('id') id: string, @GetUser() user: User) {
    return this.vendorService.deleteVendor(+id, user);
  }
}
