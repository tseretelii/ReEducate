import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;

  @IsNumber()
  @Min(0)
  @Max(999999)
  price: number;

  @IsNumber()
  @Min(0)
  @Max(999999)
  stock: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  category: string;
}

