import { IsString, IsArray, ArrayMinSize, ArrayMaxSize, IsOptional, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateVendorDto {
@IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(13)
  @Matches(/^[0-9]+$/, { message: 'Enter Number only' })
  contactNumber: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  categoryIds: number[];
}