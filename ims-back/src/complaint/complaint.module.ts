import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { ComplaintController } from './complaint.controller';
import { ComplaintService } from './complaint.service';
import { Complaint } from './entity/complaint.entity';
import { PhotoModule } from 'src/photo/photo.module';

@Module({
  imports:[ TypeOrmModule.forFeature([Complaint]),UserModule,PhotoModule],
  controllers: [ComplaintController],
  providers: [ComplaintService]
})
export class ComplaintModule {}
