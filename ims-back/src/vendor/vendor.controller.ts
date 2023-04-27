import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { Role} from 'src/user/decorators/user-role.decorator';
import { User } from 'src/user/entity/user.entity';
import { Roles } from 'src/user/enums/roles.enum';
import { RolesGuard } from 'src/user/guards/role.gaurd';
import { CreateVendorDto } from './dtos/create-vendor.dto';
import { VendorService } from './vendor.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GetVendorsDto } from './dtos/get-vendors.dto';

@Controller('vendor')
export class VendorController {
  constructor(private vendorService: VendorService) {}

  @Post()
  @Role(Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  createVendor(@Body() vendorData: CreateVendorDto) {
   return this.vendorService.createVendor(vendorData)
  }

  @Get()
  @Role(Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  @Serialize(GetVendorsDto)
  getVendors(@GetUser()user:User){
    return this.vendorService.getVendors(user)
  }
  @Get('count')
  @Role(Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  getCount(@GetUser() user: User) {
    return this.vendorService.getCount(user);
  }
  @Get(':id')
  @Role(Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  getVendor(@Param('id') id: string, @GetUser() user: User) {
    return this.vendorService.getVendor(+id,user);
  }

  @Delete(':id')
  @Role(Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  deleteVendor(@Param('id') id: string, @GetUser() user: User) {
    return this.vendorService.deleteVendor(+id,user);
  }
}
