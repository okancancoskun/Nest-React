import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseFilterQuery, Types } from 'mongoose';
import { ServiceName } from 'src/models/ServiceNameSchema';
import {CreateServiceNameDto} from "../../libs/dtos"


@Injectable()
export class ServiceNameService { 
    constructor(@InjectModel(ServiceName.name) private readonly serviceNameModel: Model<ServiceName>){}

    async create(service: CreateServiceNameDto):Promise<ServiceName>{
        const newService = new this.serviceNameModel({...service,pet:Types.ObjectId(service.pet)});
        return await newService.save();
    }

    async findOne(filter:MongooseFilterQuery<ServiceName>):Promise<ServiceName>{
        return await this.serviceNameModel.findOne(filter);
    }
    async updateOne(id:string,service:CreateServiceNameDto):Promise<ServiceName>{
        const findOne = await this.serviceNameModel.findById(id);
        await findOne.update(service);
        return await this.serviceNameModel.findById(id).exec();
    }
    async findAll():Promise<ServiceName[]>{
        return await this.serviceNameModel.find();
    }
    async deleteOne(id:string):Promise<ServiceName>{
        const findOne = await this.serviceNameModel.findById(id);
        return await findOne.deleteOne();
    }
}
