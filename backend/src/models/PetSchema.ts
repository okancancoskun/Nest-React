import {SchemaFactory,Schema,Prop} from "@nestjs/mongoose"
import { Document } from "mongoose";
import { IPet } from "../libs/interfaces";

@Schema()
export class Pet extends Document {
    @Prop({type:String}) name: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
