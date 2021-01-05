import { IsEmail, IsString, } from "class-validator"

export default class IUserDto {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    role: string;
    city:string;

}