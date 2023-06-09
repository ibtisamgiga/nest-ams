import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/modules/category/category.module';
import { UserModule } from 'src/modules/user/user.module';
import { Vendor } from './entity/vendor.entity';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';

@Module({
  imports:[TypeOrmModule.forFeature([Vendor]),UserModule,CategoryModule],
  controllers: [VendorController],
  providers: [VendorService]
})
export class VendorModule {}
