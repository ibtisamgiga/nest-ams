//@Transform(({obj})=>obj.user.id)

import { Expose, Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class GetDepartmentsDto {
  @Transform(({ obj }) => obj.id) //{console.log(obj)}
  @Expose()
  @IsNumber()
  id: number;

  @Transform(({ obj }) => obj.name) //{console.log(obj)}
  @Expose()
  name: string;

  @Transform(({ obj }) => obj.email) //{console.log(obj)}
  @Expose()
  email: string;

  @Transform(({ obj }) => obj.contactNo) //{console.log(obj)}
  @Expose()
  contactNo: string;

}
