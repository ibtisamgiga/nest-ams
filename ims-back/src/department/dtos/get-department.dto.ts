//@Transform(({obj})=>obj.user.id)

import { Expose, Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class GetDepartmentDto {
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

  @Transform(({ obj }) => obj.organization.name) //{console.log(obj)}
  @Expose()
  orgName: string;

  @Transform(({ obj }) => obj.organization.email) //{console.log(obj)}
  @Expose()
  orgEmail: string;

  @Transform(({ obj }) => obj.organization.repContactNo) //{console.log(obj)}
  @Expose()
  repContactNo: string;

  @Transform(({ obj }) => obj.organization.repName) //{console.log(obj)}
  @Expose()
  repName: string;
  @Transform(({ obj }) => obj.organization?.image?.image?obj.organization?.image?.image:'') //{console.log(obj)}
  @Expose()
  orgImage: string;
}
