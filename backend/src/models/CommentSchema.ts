import {SchemaFactory,Schema,Prop} from "@nestjs/mongoose"
import {Document,Schema as Sch} from "mongoose";
import {IComment} from "../libs/interfaces"
import {User} from "./UserSchema";

@Schema()
export class Comment extends Document{
    @Prop({type:String}) text:string;
    @Prop({type:Sch.Types.ObjectId, ref: 'User'}) authorId:User;
    @Prop({type:Number, max:5}) rating:number;
    @Prop({type:Sch.Types.ObjectId, ref:'User'}) profileId:User;
}

export const commentSchema = SchemaFactory.createForClass(Comment);