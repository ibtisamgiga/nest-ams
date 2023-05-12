import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/modules/user/user.module';
import { Request } from './entity/request.entity';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { ItemModule } from 'src/modules/item/item.module';

@Module({
  imports:[TypeOrmModule.forFeature([Request]),UserModule,ItemModule],
  controllers: [RequestController],
  providers: [RequestService],
 
})
export class RequestModule {}
