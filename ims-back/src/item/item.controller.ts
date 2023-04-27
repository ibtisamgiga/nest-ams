import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { Role } from 'src/user/decorators/user-role.decorator';
import { User } from 'src/user/entity/user.entity';
import { Roles } from 'src/user/enums/roles.enum';
import { RolesGuard } from 'src/user/guards/role.gaurd';
import { AssiginItemDto } from './dtos/assign-item.dto';
import { CreateItemDto } from './dtos/create-item.dto';
import { ItemService } from './item.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GetItemsDto } from './dtos/get-items.dto';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}
  @Post()
  @Role(Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  createItem(@Body() createItemDto: CreateItemDto, @GetUser() user: User) {
    return this.itemService.createItem(createItemDto);
  }

  @Get()
  @Role(Roles.Admin,Roles.Employee)
  @UseGuards(AuthGuard(), RolesGuard)
  @Serialize(GetItemsDto)
  getItems(@GetUser() user: User) {
    return this.itemService.getItems(user);
  }
  @Get('count')
  @Role(Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  getCount(@GetUser() user: User) {
    return this.itemService.getCount(user);
  }
  @Get('/:id')
  @Role(Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  getItem(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.itemService.getItemById(id, user);
  }
  @Delete('/:id')
  @Role(Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  deleteItem(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.itemService.deleteItem(id, user);
  }
  
  @Patch('assign/:id')
  @Role(Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  assiginItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: AssiginItemDto,
    @GetUser() user: User,
  ) {
    return this.itemService.assiginItem(id, body, user);
  }

  @Patch('unassign/:id')
  @Role(Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  unAssiginItem(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.itemService.unAssiginItem(id, user);
  }
}
