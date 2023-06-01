import { Module, NotFoundException } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entity/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {
 
}
