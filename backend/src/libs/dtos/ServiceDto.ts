import { IsMongoId, IsString, ValidateNested, IsArray, IsNumber } from 'class-validator'
import { Type } from 'class-transformer';

/* export class ServiceServicesDto {
    @IsString()
    title: string;
    @IsNumber()
    dailyPrice: number;
    @IsNumber()
    weeklyPrice: number;
    @IsNumber()
    montlyPrice: number;
} */

export class CreateServiceDto {
    @IsMongoId()
    service: any;

    @IsNumber()
    dailyPrice:number;

    @IsNumber()
    weeklyPrice:number;

    @IsNumber()
    montlyPrice:number;
   
}
