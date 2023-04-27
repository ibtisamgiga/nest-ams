//@Transform(({obj})=>obj.user.id)

import { Expose, Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class GetSingleUsersDto {
  @Transform(({ obj }) => obj.id) //
  @Expose()
  @IsNumber()
  id: number;

  @Transform(({ obj }) => obj?.name)
  @IsNotEmpty()
  @Expose()
  name: string;

  @Transform(({ obj }) => obj.email)
  @IsNotEmpty()
  @Expose()
  email: string;
  @Transform(({ obj }) => obj?.department?.name)
  @IsNotEmpty()
  @Expose()
  department: string;
  @Transform(({ obj }) => obj.privateEmail)
  @IsNotEmpty()
  @Expose()
  privateEmail: string;

  @Transform(({ obj }) => obj.contactNo)
  @IsNotEmpty()
  @Expose()
  contactNo: string;

  @Transform(({ obj }) => obj.image)
  @IsNotEmpty()
  @Expose()
  image: string;

  @Transform(({ obj }) => obj.organization.name)
  @Expose()
  organizationName: string;

  @Transform(
    ({ obj }) =>
      obj.organization.address +
      obj.organization.city +
      ' ' +
      obj.organization.country,
  )
  @Expose()
  address: string;
  @Transform(({ obj }) => obj.organization.id)
  @Expose()
  organizationId: number;

  @Transform(({ obj }) => obj.organization.repName)
  @Expose()
  repName: string;
  @Transform(({ obj }) => obj.organization.repContactNo)
  @Expose()
  repContactNo: string;

  @Transform(({ obj }) => obj.organization.bio)
  @Expose()
  bio: string;
  @Transform(({ obj }) => obj.organization.image)
  @Expose()
  orgImage: string;
  @Transform(({ obj }) => obj.organization.email)
  @Expose()
  orgEmail: string;

  @Transform(({ obj }) => {
    const arr = [];
    obj.items.map((item) => {
      arr.push({
        id: item?.id,
        name: item?.name,
        categoryName: item?.category.parent.name,
        subCategory: item.category.name,
        assiginDate: item.assigined_at,
        assignedBy: item.assigned_by,
      });
    });
    return arr;
  })
  @Expose()
  items: [];

  @Transform(({ obj }) => {
    const re = [];
    obj.requests.map((request) => {
      re.push({
        id: request.id,
        name: request.item.name,
        categoryName: request.item.category.parent.name,
        subCategory: request.item.category.name,
        status: request.status,
        actionBy: request.action_by,
      });
    });
    return re;
  })
  @Expose()
  requests: [];

  //  @Transform(({ obj }) => console.log(obj))
  //  @Expose()
  //  a: string;
}
