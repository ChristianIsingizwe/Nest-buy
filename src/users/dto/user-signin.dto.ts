import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserSigninDto {
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'You must provide a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Password must not be empty' })
  @MinLength(8, {
    message: 'The password must have at least a minimum of 8 characters',
  })
  password: string;
}
