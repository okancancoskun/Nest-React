import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/UserSchema';
import { CommentModule } from '../Comment/comment.module';
import {UserService} from "./user.service"
@Module({
    imports: [MongooseModule.forFeature(
        [
            {name:User.name,schema:UserSchema}
        ]
    )],
    providers: [UserService],
    exports:[UserService]
})
export class UserModule { }
