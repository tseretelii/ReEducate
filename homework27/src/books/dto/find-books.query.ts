import {
  IsBooleanString,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FindBooksQueryDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBooleanString()
  published?: string;

  @IsOptional()
  @IsDateString()
  createdAfter?: string;

  @IsOptional()
  @IsDateString()
  createdBefore?: string;
}


