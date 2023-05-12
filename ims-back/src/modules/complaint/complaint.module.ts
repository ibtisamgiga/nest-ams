import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/modules/user/user.module';
import { ComplaintController } from './complaint.controller';
import { ComplaintService } from './complaint.service';
import { Complaint } from './entity/complaint.entity';
import { PhotoModule } from 'src/modules/photo/photo.module';

@Module({
  imports:[ TypeOrmModule.forFeature([Complaint]),UserModule,PhotoModule],
  controllers: [ComplaintController],
  providers: [ComplaintService]
})
export class ComplaintModule {}
