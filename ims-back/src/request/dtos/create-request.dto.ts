import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRequestDto {
 
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  @IsIn(['Acquisition', 'Faulty'])
  requestType: string;

  @IsNumber()
  itemId: number;
}
