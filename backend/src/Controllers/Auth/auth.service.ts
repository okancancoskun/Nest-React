import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from "bcrypt"
import { Model } from 'mongoose';
import { LoginUserDto, RegisterUserDto } from 'src/libs/dtos';
import { User } from 'src/models/UserSchema';
import * as jwt from "jsonwebtoken"
import environment from 'src/environment';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async registerUser(user: RegisterUserDto): Promise<User> {
        const isUserExist = await this.userModel.findOne({ email: user.email });
        if (!isUserExist) {
            const newUser = new this.userModel(user);
            return await newUser.save();
        } else {
            throw new HttpException('User Already Exist', HttpStatus.FORBIDDEN)
        }
    }

    async loginUser(user: LoginUserDto): Promise<any> {
        const isUserExist = await this.userModel.findOne({ email: user.email });
        if (isUserExist) {
            const isSucces = await compare(user.password, isUserExist.password);
            if (isSucces) {
                const { _id, email, role,city } = isUserExist
                const token = await jwt.sign({ _id: _id, email: email, role: role,city:city }, environment.token);
                return {
                    token,
                    user: { _id, email, role,city }
                }
            }
            else {
                throw new HttpException('Email or password is incorrect', HttpStatus.BAD_REQUEST);
            }
        } else {
            throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
        }
    }
}
