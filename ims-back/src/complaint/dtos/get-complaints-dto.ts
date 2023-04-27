//@Transform(({obj})=>obj.user.id)

import { Expose, Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class GetComplaintsDto {
  // @Transform(({ obj }) => obj.id)
  // @Expose()
  // @IsNumber()
  // id: number;

  // @Transform(({ obj }) =>  obj.user.name)
  // @Expose()
  // name: string


  // @Transform(({ obj }) =>   obj.user.organization.name)
  // @Expose()
  // organizationName:string

  // @Transform(({ obj }) => obj.description)
  // @Expose()
  // description: string;



  // @Transform(({ obj }) => obj.submissionDate)
  // @Expose()
  // submissionDate: Date;

  // @Transform(({ obj }) => obj.title)
 
  // title: string;

  // @Transform(({ obj }) => obj.status)
  // @Expose()
  // status: string;


  @Transform(({ obj }) => {
    const arr = [];
    obj.compalints.map((compalint) => {
      arr.push({
        id: compalint?.id,
        name: compalint?.user?.name,
        org:compalint?.organization?.name,
        descritption: compalint?.description,
        submissionDate: compalint?.submissionDate,
        title: compalint?.title,
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
      userImage:obj.user.image
      //organizationImage:obj.user.organization.image
    };
  })

  user: {};
}
