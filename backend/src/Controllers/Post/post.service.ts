import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDto } from 'src/libs/dtos';
import { FilterModel } from 'src/models/FilterModel';
import { Post } from 'src/models/PostSchema';
import * as cloudinary from "cloudinary";

@Injectable()
export class PostService {
    constructor(@InjectModel(Post.name) private readonly postModel: Model<Post>) {
        cloudinary.v2.config({
            cloud_name: 'ds513gzod',
            api_key: '994549185894894',
            api_secret: 'Qogxw9bIAIDZ2wCrKWCjUe50Yes'
        })
    }
    generalPaginating = {
        page: 1,
        size: 10,
        search: ''
    }
    async findAll(query?: FilterModel): Promise<any> {
        if (Object.keys(query).length !== 0) {
            const searchValue = await { ...this.generalPaginating, ...query }
            const escapeRegex: (text: string) => string = (text) => {
                return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
            }
            const Regex = new RegExp(escapeRegex(searchValue.search), "gi")
            const count: number = await this.postModel.find({ city: Regex }).countDocuments();
            const data = await this.postModel
                .find({ city: Regex })
                .limit(Math.max(0, searchValue.size))
                .skip(searchValue.size * (searchValue.page - 1))
                .exec()
            const totalPage:number = Math.ceil(count/query.size);
            return {
                totalPage:totalPage,
                count: count,
                data
            }
        } else {
            return await this.postModel.find().exec();
        }
    }
    async findOne(id): Promise<Post> {
        return await this.postModel.findById(id);
    }


    async createWithFile(post: PostDto, file: any) {
        let result;
        try {
            await cloudinary.v2.uploader.upload(file.path, function (error, response) {
                result = response;
                return response;
            })
            const newPost = await new this.postModel({ ...post, image: result.url });
            return await newPost.save();

        } catch (error) {
            return await error;
        }
    }

    async create(post: PostDto): Promise<Post> {
        try {

            const newPost = await new this.postModel(post);
            return await newPost.save();

        } catch (error) {
            return await error;
        }
    }

    async updatePost(id: string, post: PostDto): Promise<Post> {
        const findPost = await this.postModel.findById(id);
        await findPost.updateOne(post);
        return await this.postModel.findById(id).exec();
    }

    async deletePost(id: string): Promise<Post> {
        const findPost = await this.postModel.findById(id);
        return await findPost.deleteOne()
    }
}

