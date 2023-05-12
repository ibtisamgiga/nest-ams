import { Expose, Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class GetDepartmentDto {
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

  @Transform(({ obj }) => obj.organization.name)
  @Expose()
  orgName: string;

  @Transform(({ obj }) => obj.organization.email)
  @Expose()
  orgEmail: string;

  @Transform(({ obj }) => obj.organization.repContactNo)
  @Expose()
  repContactNo: string;

  @Transform(({ obj }) => obj.organization.repName)
  @Expose()
  repName: string;
  @Transform(({ obj }) =>
    obj.organization?.image?.image ? obj.organization?.image?.image : '',
  )
  @Expose()
  orgImage: string;
}
