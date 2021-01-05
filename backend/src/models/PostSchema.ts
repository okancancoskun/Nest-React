import {SchemaFactory,Schema,Prop} from "@nestjs/mongoose"
import { Document,Schema as Sch } from "mongoose";
import {IPost} from "../libs/interfaces"
@Schema()
export class Post extends Document {
    @Prop({}) title:string;
    @Prop({}) detail:string;
    /*@Prop({ref:'Category',type:Sch.Types.ObjectId}) categoryId:Category; */
    @Prop({type:String}) city: string;
    @Prop({type:Boolean, default: false}) isActive: boolean;
    @Prop({type:String}) image: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
