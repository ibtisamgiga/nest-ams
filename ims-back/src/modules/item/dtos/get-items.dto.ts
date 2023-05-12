//@Transform(({obj})=>obj.user.id)

import { Expose, Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class GetItemsDto {
  @Transform(({ obj }) => obj.id) //{console.log(obj)}
  @Expose()
  @IsNumber()
  id: number;

  @Transform(({ obj }) => obj.name) //{console.log(obj)}
  @Expose()
  name: string;

  @Transform(({ obj }) => obj.description) //{console.log(obj)}
  @Expose()
  description: string;

  @Transform(({ obj }) => obj.category.parent.name) //{console.log(obj)}
  @Expose()
  category: string;

  @Transform(({ obj }) => obj.category.name) //{console.log(obj)}
  @Expose()
  subCategory: string;

  @Transform(({ obj }) => obj.price) //{console.log(obj)}
  @Expose()
  @IsNumber()
  price: number;

}
