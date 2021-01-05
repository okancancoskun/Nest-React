import * as mongoose from "mongoose"
export interface IUser{
    email:string;
    passwornd:string;
    role:string;
    city:string;
    pets:any[];
    services:any[];
}