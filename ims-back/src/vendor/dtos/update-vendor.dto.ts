import {
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsOptional,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class UpdateVendorDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @Matches(/^[0-9]+$/, { message: 'Enter Number only' })
  contactNumber: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsOptional()
  categoryIds: number[];
}
