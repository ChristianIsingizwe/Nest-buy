import {  IsNotEmpty, IsString } from 'class-validator';
import { UserSigninDto } from './user-signin.dto';
export class UserSignupDto extends UserSigninDto {
  @IsNotEmpty({ message: 'Name cannot be null' })
  @IsString({ message: 'Name must be a valid string' })
  name: string;
}
