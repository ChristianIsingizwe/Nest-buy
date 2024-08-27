import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateShippingDto {
  @IsNotEmpty({ message: 'Phone cannot be empty' })
  @IsString({ message: 'Phone format should be string' })
  phone: string;

  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'address cannot be empty' })
  @IsString({ message: 'address format should be string' })
  address: string;

  @IsNotEmpty({ message: 'city cannot be empty' })
  @IsString({ message: 'city should be string' })
  city: string;

  @IsNotEmpty({ message: 'postCode cannot be empty' })
  @IsString({ message: 'postCode format should be string' })
  postCode: string;

  @IsNotEmpty({ message: 'State cannot be empty' })
  @IsString({ message: 'State should be string' })
  state: string;

  @IsNotEmpty({ message: 'Country cannot be empty' })
  @IsString({ message: 'Country should be string' })
  country: string;
}
