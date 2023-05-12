import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCompalintDto {
  @IsOptional()
  @IsString()
  @IsIn(['Pending','Resolved'])
  status: string;
  
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  images: [{}];

 
  @IsString()
  description: string;
}
