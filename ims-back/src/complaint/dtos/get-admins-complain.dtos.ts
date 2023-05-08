//@Transform(({obj})=>obj.user.id)

import { Expose, Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class GetAdminsComplaintsDto {
  @Transform(({ obj }) => {
    const arr = [];
    obj.compalints.map((compalint) => {
      arr.push({
        id: compalint?.id,
        name: compalint?.user?.name,
        descritption: compalint?.description,
        submissionDate: compalint?.submissionDate,
        status: compalint?.status,
      });
    });
    return arr;
  })
  @Expose()
  complaints: [];

  @Transform(({ obj }) => {
    const arr = [];
    obj.myCompalints.map((compalint) => {
      arr.push({
        id: compalint?.id,
        descritption: compalint?.description,
        submissionDate: compalint?.submissionDate,
        status: compalint?.status,
      });
    });
    return arr;
  })
  @Expose()
  myComplaints: [];
}
