import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entity/photo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Photo])],
  providers: [PhotoService],
  exports:[PhotoService]
})
export class PhotoModule {}
