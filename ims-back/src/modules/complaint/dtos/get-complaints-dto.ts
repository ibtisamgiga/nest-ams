//@Transform(({obj})=>obj.user.id)

import { Expose, Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class GetComplaintsDto {
  @Transform(({ obj }) => {
    const arr = [];
    obj.compalints.map((compalint) => {
      arr.push({
        id: compalint?.id,
        name:
          compalint.user.roles.role == 'employee'
            ? compalint?.title
            : compalint?.user?.name,
        org:
          compalint.user.roles.role == 'employee'
            ? undefined
            : compalint?.user?.organization?.name,
        descritption: compalint?.description,
        submissionDate: compalint?.submissionDate,
        //title: compalint.user.roles.role=='employee'? undefined:compalint?.title,
        status: compalint?.status,
      });
    });
    return arr;
  })
  @Expose()
  complaints: [];

  @Transform(({ obj }) => {
    return {
      organizationName: obj.user.organization.name,
      organizationId: obj.user.organization.id,
      organizationEmail: obj.user.organization.email,
      //organizationImage:obj.user.organization.image
    };
  })
  organization: {};

  @Transform(({ obj }) => {
    return {
      name: obj.user.name,
      userId: obj.user.id,
      userEmail: obj.user.email,
      userContactNo: obj.user.contactNo,
      userImage: obj.user.image,
      //organizationImage:obj.user.organization.image
    };
  })
  user: {};
}
