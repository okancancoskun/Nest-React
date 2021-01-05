import { Prop } from "@nestjs/mongoose";
import { IsArray, IsString } from "class-validator";

export default class UpdateUserDto{
    @IsString()
    email:string;

    @IsString()
    password:string;

    @IsString()
    role:string;

    @IsString()
    city:string;

    @IsArray()
    pets:any[]

    @IsArray()
    services:any[]
    
}