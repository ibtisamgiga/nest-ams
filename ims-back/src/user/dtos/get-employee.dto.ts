//@Transform(({obj})=>obj.user.id)

import { Expose, Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Roles } from '../enums/roles.enum';
export class GetEmployeeDto {
  @Transform(({ obj }) => obj.id) //{console.log(obj)}
  @Expose()
  @IsNumber()
  id: number;

  // @Transform(({ obj }) => obj.image?.image)
  // @IsNotEmpty()
  // @Expose()
  // image: string

  @Transform(({ obj }) => obj.name)
  @IsNotEmpty()
  @Expose()
  name: string;



  @Transform(({ obj }) => obj.email)
  @IsNotEmpty()
  @Expose()
  email: string;

  @Transform(({ obj }) => obj.contactNo)
  @IsNotEmpty()
  @Expose()
  contactNo: string;

  @Transform(({ obj }) => obj.department?.name?obj.department?.name:'none')
  @IsNotEmpty()
  @Expose()
  department: string;


  //   @Transform(({ obj }) => obj.user.rolesId)
  //   @Expose()
  //   @IsNumber()
  //   rolesId: number;
  //   @Transform(({ obj }) => obj.accessToken)
  //   @Expose()
  //   token:string;
}
