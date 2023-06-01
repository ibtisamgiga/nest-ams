import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/modules/user/decorators/get-user.decorator';
import { Role } from 'src/modules/user/decorators/user-role.decorator';
import { User } from 'src/modules/user/entity/user.entity';
import { Roles } from 'src/modules/user/enums/roles.enum';
import { RolesGuard } from 'src/modules/user/guards/role.gaurd';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GetCategoriesDto } from './dtos/get-categories.dto';
import { GetCategoryDto } from './dtos/get-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Role(Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetUser() user: User,
  ) {
    return this.categoryService.createCategory(createCategoryDto, user);
  }
  @Get('count')
  @Role(Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  getCount(@GetUser() user: User) {
    return this.categoryService.getCount(user);
  }
  @Get()
  @Role(Roles.Admin, Roles.Employee)
  @UseGuards(AuthGuard(), RolesGuard)
  getCategories(@GetUser() user: User) {
    return this.categoryService.getCategories(user);
  }

  @Get('details')
  @Role(Roles.Admin, Roles.Employee)
  @UseGuards(AuthGuard(), RolesGuard)
  @Serialize(GetCategoriesDto)
  getCategoriesDetail(@GetUser() user: User) {
    return this.categoryService.countCategories(user);
  }

  @Get(':id')
  @Role(Roles.Admin, Roles.Employee)
  @UseGuards(AuthGuard(), RolesGuard)
  @Serialize(GetCategoryDto)
  getCategory(@Param('id') id: string, @GetUser() user: User) {
    return this.categoryService.getCategory(+id, user);
  }

  @Patch(':id')
  @Role(Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @GetUser() user: User,
  ) {
    return this.categoryService.updateCategory(+id, updateCategoryDto, user);
  }

  @Delete(':id')
  @Role(Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  deleteCategory(@Param('id') id: string, @GetUser() user: User) {
    return this.categoryService.deleteCategory(+id, user);
  }
}
