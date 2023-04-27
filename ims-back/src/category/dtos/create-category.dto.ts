import { Optional } from '@nestjs/common';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsArray()
  subCategories:any[];

   @IsOptional()
   parentId: number;

}
