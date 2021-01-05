import {IsEmail, IsString,} from "class-validator"

export default class IUserDto{
    email:string;
    password:string;
    role:any;
}