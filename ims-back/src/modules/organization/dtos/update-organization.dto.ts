import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateOrganizationDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  @Matches(/^[A-Za-z]+$/, { message: 'only alphabets' })
  repName: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(13)
  repContactNo: string;
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsString()
  city: string

  @IsOptional()
  @IsString()
  zip: string

  @IsOptional()
  @IsString()
  country: string

  @IsOptional()
  @IsString()
  bio: string


  @IsOptional()
  image:{}
}
