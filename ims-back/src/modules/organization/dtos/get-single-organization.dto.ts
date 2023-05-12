//@Transform(({obj})=>obj.user.id)

import { Expose, Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { GetSingleUsersDto } from 'src/modules/user/dtos/get-single-user.dto';
import { GetUsersDto } from 'src/modules/user/dtos/get-users.dto';
export class GetSingleOrganizationDto {
  @Transform(({ obj }) => obj.id) //
  @Expose()
  @IsNumber()
  id: number;

  @Transform(({ obj }) => obj.name)
  @IsNotEmpty()
  @Expose()
  name: string;

  @Transform(({ obj }) => obj.email)
  @IsNotEmpty()
  @Expose()
  email: string;

  @Transform(({ obj }) => obj.repName)
  @IsNotEmpty()
  @Expose()
  repName: string;

  @Transform(({ obj }) => obj.repContactNo)
  @IsNotEmpty()
  @Expose()
  repContactNo: string;

  @Transform(({ obj }) => obj.image)
  @IsNotEmpty()
  @Expose()
  image: string;

  @Transform(({ obj }) => obj.bio)
  @IsNotEmpty()
  @Expose()
  bio: string;


  @Transform(({ obj }) => obj.address)
  @IsNotEmpty()
  @Expose()
  address: string;

  @Transform(({ obj }) => obj.zip)
  @IsNotEmpty()
  @Expose()
  zip: string;

  @Transform(({ obj }) => obj.city)
  @IsNotEmpty()
  @Expose()
  city: string;

  @Transform(({ obj }) => obj.country)
  @IsNotEmpty()
  @Expose()
  country: string;
  @Transform(({ obj }) =>
    obj.users.map((user) => {
      return {
        id: user.id,
        image: user?.image?.image,//obj.image? obj.image?.image:null
        adminName: user.name,
        adminEmail: user.email,
        adminNumber: user.contactNo,
        roles:user.roles.role
        //role: user.rolesId,
      };
    }),
  )
  @Expose()
  // @IsNumber()
  admins: [];
}
