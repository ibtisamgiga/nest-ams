import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/modules/user/user.module';
import { Department } from './entity/department.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Department]),UserModule],
  controllers: [DepartmentController],
  providers: [DepartmentService]
})
export class DepartmentModule {}
