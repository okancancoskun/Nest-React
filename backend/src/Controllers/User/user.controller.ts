import { Controller, Get, Param,Request } from '@nestjs/common';
import { get } from 'http';
import * as mongoose from "mongoose"
import { User } from 'src/models/UserSchema';
import { UserService } from './user.service';

@Controller('user')
export class UserController { 
    constructor(private readonly userService:UserService){}

    
    /* @Get('/aggre')
    async findRec(@Request() req):Promise<any[]>{
        return await this.userService.findRecomended(req);
    } */
    @Get('rec')
    async findRec(@Request() req):Promise<any[]>{
        return await this.userService.findRecomendedUsers(req);
    }
    @Get('/by-city')
    async findAll(@Request() req):Promise<any[]>{
        return await this.userService.findUsersWithFilter(req);
    }
    @Get(':id')
   
    async findOne(@Param('id') id:string):Promise<User>{
        return await this.userService.findUserById({_id:id});
        
    }
    @Get('')
    async findUsersByCity(@Request() req):Promise<any[]>{
        return await this.userService.findUsers()
    }
    
    
}
