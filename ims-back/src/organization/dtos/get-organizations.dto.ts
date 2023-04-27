//@Transform(({obj})=>obj.user.id)

import { Expose, Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class GetOrganizationsDto {
    @Transform(({ obj }) => obj.id) //{console.log(obj)}
  @Expose()
  @IsNumber()
  id: number;

  @Transform(({ obj }) =>obj.image? obj.image?.image:null)
  @IsNotEmpty()
  @Expose()
  image: string;

  @Transform(({ obj }) => obj.name)
  @IsNotEmpty()
  @Expose()
  name: string;

  @Transform(
    ({ obj }) => obj.city + ' ' + obj.country,
  )
  @Expose()
  location: string;

  @Transform(({ obj }) => obj.email)
  @IsNotEmpty()
  @Expose()
  email: string;

  @Transform(({ obj }) => obj.repContactNo)
  @IsNotEmpty()
  @Expose()
  number: string;

 

  //   @Transform(({ obj }) => obj.user.rolesId)
  //   @Expose()
  //   @IsNumber()
  //   rolesId: number;
  //   @Transform(({ obj }) => obj.accessToken)
  //   @Expose()
  //   token:string;
}
//@Transform(({obj})=>obj.user.id)
