import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Title cannot be blank' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'Description cannot be empty' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Price should not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price should be a number and max decimal precision 2' },
  )
  @IsPositive({ message: 'Price should be a positive number' })
  price: number;

  @IsNotEmpty({ message: 'Stock cannot be empty' })
  @IsNumber(
    {},
    { message: 'Price should be a number and max decimal precision 2' },
  )
  @Min(0, { message: 'Stock cannot be negative' })
  stock: number;

  @IsNotEmpty({ message: 'Images cannot be empty' })
  @IsArray({ message: 'Images should be in an array format' })
  images: string[];

  @IsNotEmpty({ message: 'Category cannot be empty' })
  @IsNumber({}, { message: 'Category id should be a number' })
  categoryId: number;
}
