import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateServiceNameDto} from 'src/libs/dtos';
import { ServiceName } from 'src/models/ServiceNameSchema';
import { ServiceNameService } from './servicename.service';

@Controller('servicename')
export class ServiceNameController { 
    constructor(private readonly serviceNameService: ServiceNameService){}
    @Post('create')
    async create(@Body() body: any):Promise<ServiceName>{
        return await this.serviceNameService.create(body)
    }
    @Get(':id')
    async findOne(@Param() id:string):Promise<ServiceName>{
       return await this.serviceNameService.findOne({_id:id});
    }

    @Put('update/:id')
    async updateOne(@Param() id:string,@Body() body:CreateServiceNameDto){
        return await this.serviceNameService.updateOne(id,body);
    }

    @Get('')
    async findAll():Promise<ServiceName[]>{
        return await this.serviceNameService.findAll()
    }
    @Delete('delete/:id')
    async deleteOne(@Param() id:string):Promise<ServiceName>{
        return await this.serviceNameService.deleteOne(id);
    }
}
