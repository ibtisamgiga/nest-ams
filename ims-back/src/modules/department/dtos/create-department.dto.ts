import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  @MaxLength(13)
  @Matches(/^[0-9]+$/, { message: 'Enter Number only' })
  contactNo: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}
