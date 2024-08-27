import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class OrderedProductsDto {
  @IsNotEmpty({ message: 'Product cannot be empty' })
  id: number;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price should be number and max decimal precision of 2' },
  )
  @IsPositive({ message: 'Price cannot be negative' })
  product_unit_price: number;

  @IsNumber({}, { message: 'Quantity should be a number' })
  @IsPositive({ message: 'Quantity cannot be negative' })
  product_quantity: number;
}
