import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/models/PostSchema';
import { PostService } from './post.service';

@Module({
    imports: [MongooseModule.forFeature(
        [
            {name:Post.name,schema:PostSchema}
        ]
    )],
    providers: [PostService],
    exports:[PostService]
})
export class PostModule { }
