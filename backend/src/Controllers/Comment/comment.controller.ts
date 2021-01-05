import { Body, Controller, Delete, Get, Param, Post, Request } from '@nestjs/common';
import { CommentDto } from 'src/libs/dtos/CommentDto';
import { Comment } from 'src/models/CommentSchema';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService:CommentService){}
    

    @Get('/userComments/:id')
    async getProfileComments(@Param('id') id:string):Promise<Comment[]>{
        return await this.commentService.getProfileComments(id);
    }
    @Post('add-comment/:id')
    async addComment(@Param('id') id:string,@Body() body:CommentDto,@Request() req):Promise<any>{
        return await this.commentService.postComment(id,{...body,authorId:req.user})
    }
    @Delete(':id')
    async deleteOne(@Param('id') id:string):Promise<any>{
        return await this.commentService.deleteComment(id);
    }
    @Get('')
    async findAll():Promise<Comment[]>{
        return await this.commentService.findAll({})
    }
}
