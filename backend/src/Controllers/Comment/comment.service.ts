import { Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseFilterQuery, MongooseQueryOptions } from 'mongoose';
import * as mongoose from "mongoose"
import { CommentDto } from 'src/libs/dtos/CommentDto';
import { Comment } from 'src/models/CommentSchema';
import { UserService } from '../User/user.service';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private readonly commentModel:Model<Comment>,private readonly userService:UserService){}

    async postComment(id:string,commentDto:CommentDto):Promise<any>{
        const userProfile = await this.userService.findUserById({_id:id});
        const newComment = await new this.commentModel({...commentDto,profileId:userProfile._id});

        return await newComment.save();
    }

    async deleteComment(id:string):Promise<any>{
        const comment = this.commentModel.findById(id);
        return await comment.remove();
    }

    async getProfileComments(id:string):Promise<Comment[]>{
        const userProfile = await this.userService.findUserById({_id:id});
        return await this.commentModel.find({profileId:userProfile._id}).populate('authorId');
    }
    async findAll(filter:MongooseFilterQuery<Comment>,options?:MongooseQueryOptions):Promise<Comment[]>{
        return await this.commentModel.find(filter,options).sort({'rating':-1}).populate("profileId authorId")
    }

}
