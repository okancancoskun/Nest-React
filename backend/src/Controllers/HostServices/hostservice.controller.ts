import { Body, Controller, Param, Post, Request } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateServiceDto } from 'src/libs/dtos';
import { HostService } from 'src/models/HostServiceSchema';
import { HostServiceService } from './hostservice.service';

@Controller('host')
export class HostServiceController { 
    constructor(private readonly hostServiceService:HostServiceService){}

    @Post('create')
    async create(@Body() body:CreateServiceDto, @Request() req):Promise<HostService>{
        return await this.hostServiceService.create(body,req);
    }
}
