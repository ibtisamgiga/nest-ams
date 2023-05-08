import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Item } from './entity/item.entity';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports:[TypeOrmModule.forFeature([Item]),UserModule],
  controllers: [ItemController],
  providers: [ItemService],
  exports:[ItemService]
})
export class ItemModule {}
