import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateItemDto {
  @IsOptional()
  name: string;

  @IsOptional()
  serialNumber: string;

  @IsOptional()
  description: string;

  @IsOptional()
  vendorId: number;

  @IsOptional()
  categoryId: number;

  @IsOptional()
  price: number;
  
  @IsOptional()
  faulty:boolean;
}
