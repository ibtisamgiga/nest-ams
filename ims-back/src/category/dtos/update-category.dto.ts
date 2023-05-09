import { PartialType } from '@nestjs/mapped-types';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsOptional()
  subCategories: any[];
}
