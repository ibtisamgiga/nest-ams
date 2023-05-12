import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class UpdateDepartmentDto {
  @IsOptional()
  name: string;

  @IsOptional()
  contactNo: string;

  @IsOptional()
  email: string;
}
