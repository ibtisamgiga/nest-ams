//@Transform(({obj})=>obj.user.id)

import { Expose, Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class GetDepartmentsDto {
  @Transform(({ obj }) => obj.id) 
  @Expose()
  @IsNumber()
  id: number;

  @Transform(({ obj }) => obj.name) 
  @Expose()
  name: string;

  @Transform(({ obj }) => obj.email) 
  @Expose()
  email: string;

  @Transform(({ obj }) => obj.contactNo) 
  @Expose()
  contactNo: string;

}
