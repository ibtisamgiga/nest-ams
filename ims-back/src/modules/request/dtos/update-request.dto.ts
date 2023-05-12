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

export class UpdateRequestDto {
  @IsOptional()
  status: string;

  @IsOptional()
  action_by: string;

  @IsOptional()
  type: string;
}
