import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  bio?: string;
}

