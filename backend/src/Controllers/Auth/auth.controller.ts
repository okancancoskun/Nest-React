import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from 'src/libs/dtos';
import { User } from 'src/models/UserSchema';
import { AuthService } from './auth.service';

@Controller('user')
export class AuthController { 
    constructor(private readonly authService:AuthService){}
    
    @Post('/register')
    async register(@Body() body:RegisterUserDto):Promise<User>{
        return await this.authService.registerUser(body);
    }
    @Post('/login')
    async login(@Body() body:LoginUserDto):Promise<any>{
        return await this.authService.loginUser(body)
    }
}
