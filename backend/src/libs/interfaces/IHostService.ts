import * as mongoose from "mongoose"
export interface IHostService{
    service:any;
    dailyPrice:number;
    weeklyPrice:number;
    montlyPrice:number;
}