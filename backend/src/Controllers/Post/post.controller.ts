import { Body, Controller, Delete, Get, Param,Post, Put,Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { query } from 'express';
import { PostDto } from 'src/libs/dtos';
import { FilterModel } from 'src/models/FilterModel';
import { Post as PostModel } from 'src/models/PostSchema';
import { PostService } from './post.service';
import { extname } from "path";
import { diskStorage } from "multer";

const storageOptions = diskStorage({
    destination: './images',
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}.${extname(file.originalname)}`)
    }
})


@Controller('post')
export class PostController {
    constructor(private readonly postService:PostService){}

    @Get()
    async findAll(@Query() query:FilterModel):Promise<PostModel[]>{
        return await this.postService.findAll(query);
    }
    @Get(':id')
    async findOne(@Param('id') id:string):Promise<PostModel>{
        return await this.postService.findOne(id);
    }

    @Post('/add-post')
    @UseInterceptors(FileInterceptor('image',{storage:storageOptions}))
    async create(@Body() body:PostDto, @UploadedFile() file:any ):Promise<PostModel>{
        if(file){
            return await this.postService.createWithFile(body,file)
        }else{
            return await this.postService.create(body);
        }
        
    }
    @Put('/update-post/:id')
    async update(@Param('id') id:string, @Body() body:PostDto):Promise<PostModel>{
        return await this.postService.updatePost(id,body)
    }

    @Delete('/delete/:id')
    async deleteOne(@Param() params):Promise<PostModel>{
        return await this.postService.deletePost(params.id);
    }
}
