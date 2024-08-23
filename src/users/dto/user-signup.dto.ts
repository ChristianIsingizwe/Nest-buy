import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
export class UserSignupDto{
    @IsNotEmpty({message: "Name cannot be null"})
    @IsString({message: "Name must be a valid string"})
    name:string;

    @IsNotEmpty({message: "Email cannot be empty"})
    @IsEmail({}, {message: "You must provide a valid email"})
    email:string;

    @IsNotEmpty({message: "Password must not be empty"})
    @MinLength(8, {message: "The password must have at least a minimum of 8 characters"})
    password:string

}