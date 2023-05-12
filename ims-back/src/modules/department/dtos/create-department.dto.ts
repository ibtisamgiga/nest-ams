import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  contactNo: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}
