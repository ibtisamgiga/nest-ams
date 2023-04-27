import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Request } from './entity/request.entity';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';

@Module({
  imports:[TypeOrmModule.forFeature([Request]),UserModule],
  controllers: [RequestController],
  providers: [RequestService],
 
})
export class RequestModule {}
