import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import { Document, Schema as Sch } from "mongoose";
import { Pet } from "./PetSchema";
import {IServiceName} from "../libs/interfaces"
@Schema()
export class ServiceName extends Document {
    @Prop({ type: String }) name: string;
    @Prop({ type: String }) description: string;
    @Prop({ type: Sch.Types.ObjectId, ref: 'Pet' }) pet: Pet;
}

export const serviceNameSchema = SchemaFactory.createForClass(ServiceName);

