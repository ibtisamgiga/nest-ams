import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class AssiginItemDto {
  @IsNumber()
  userId: number;
}
