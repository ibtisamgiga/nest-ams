//@Transform(({obj})=>obj.user.id)

import { Expose, Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class GetRequestsDto {
  @Transform(({ obj }) => obj.id) //{console.log(obj)}
  @Expose()
  @IsNumber()
  id: number;

  @Transform(({ obj }) => obj?.user?.name)
  @IsNotEmpty()
  @Expose()
  name: string;

  @Transform(({ obj }) => obj?.item?.name)
  @IsNotEmpty()
  @Expose()
  itemName: string;

  @Transform(({ obj }) => obj?.item?.category?.parent?.name)
  @IsNotEmpty()
  @Expose()
  category: string;

  @Transform(({ obj }) => obj?.item?.category?.name)
  @IsNotEmpty()
  @Expose()
  subCategory: string;

  //   @Transform(({ obj }) =>obj.image? obj.image?.image:null)
  //   @IsNotEmpty()
  //   @Expose()
  //   image: string;
  @Transform(({ obj }) => obj.created_at)
  @IsNotEmpty()
  @Expose()
  date: string;
  @Transform(({ obj }) => obj.status)
  @Expose()
  status: string;


}
