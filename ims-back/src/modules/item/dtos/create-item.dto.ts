import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  serialNumber: string;
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  vendorId: number;
  
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
