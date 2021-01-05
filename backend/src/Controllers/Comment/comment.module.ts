import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { Comment, commentSchema } from "src/models/CommentSchema";
import { UserModule } from '../User/user.module';
import { CommentService } from './comment.service';

@Module({
    imports: [MongooseModule.forFeature(
        [
            {name:Comment.name,schema:commentSchema},
        ]
    ),UserModule],
    providers: [CommentService],
    exports:[CommentService]
})
export class CommentModule { }
