import { Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { CreateServiceDto } from '../../libs/dtos';
import { HostService } from 'src/models/HostServiceSchema';
import { UserService } from '../User/user.service';

@Injectable()
export class HostServiceService { 
    constructor(@InjectModel(HostService.name) private readonly serviceModel:Model<HostService>,private readonly userService:UserService){}

    async create(serviceDto:CreateServiceDto, @Request() req):Promise<HostService>{
        const newService = new this.serviceModel({...serviceDto,service:Types.ObjectId(serviceDto.service)});
        const savedService = await newService.save();
        await this.userService.addNewServiceToUser(req.user._id , savedService)
        return savedService;
    }



}
