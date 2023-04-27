//@Transform(({obj})=>obj.user.id)

import { Expose, Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class UserDto {
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  @IsNumber()
  id: number;

  @Transform(({ obj }) => obj.user.name)
  @IsNotEmpty()
  @Expose()
  name: string;

  @Transform(({ obj }) => obj.user.email)
  @IsNotEmpty()
  @Expose()
  email: string;

  @Transform(({ obj }) => obj.user.contactNo)
  @IsNotEmpty()
  @Expose()
  contactNo: string;

  @Transform(({ obj }) => obj.user.image)
  @IsNotEmpty()
  @Expose()
  image: string;

  @Transform(({ obj }) => obj.user.organizationId)
  @Expose()
  @IsNumber()
  organizationId: number;

  @Transform(({ obj }) => obj.user.rolesId)
  @Expose()
  @IsNumber()
  rolesId: number;

  @Transform(({ obj }) => obj.user.roles.role)
  @Expose()
  role: string;
  @Transform(({ obj }) => 'Bearer '+obj.accessToken)
  @Expose()
  token: string;
}
