import { Schema, SchemaFactory, Prop, raw } from "@nestjs/mongoose"
import { Document, Schema as Sch } from "mongoose";
import * as bcrypt from "bcrypt"
import { Comment } from "./CommentSchema";
import { Pet } from "./PetSchema";
import { HostService } from "./HostServiceSchema";
import {IUser} from "../libs/interfaces/IUser"


@Schema()
export class User extends Document{
    /* @Prop({}) name: String;
    @Prop({}) surname: String; */
    @Prop({ required: true, type: String, trim: true }) email: string;
    @Prop({ required: true, type: String }) password: string;
    @Prop({ required: true, default: 'user', enum: ["user", "admin", "vet", "host"] }) role: string;
    @Prop({ type: String }) city: string;
    @Prop({ type: [{ type: Sch.Types.ObjectId, ref: 'Pet' }] }) pets: Pet[];
    @Prop({ type: [{ type: Sch.Types.ObjectId, ref: 'Service' }] }) services: HostService[]

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: Function) {
    (this as User).password = await bcrypt.hash((this as User).password, 4);
    next();
})
