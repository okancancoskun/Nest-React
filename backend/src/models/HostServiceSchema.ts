import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
// import {ServiceName} from "./"
import { Document, Types } from "mongoose";
import { ServiceName } from "./ServiceNameSchema"
import {IServiceName} from "../libs/interfaces"

@Schema()
export class HostService extends Document {
    @Prop({ type: Types.ObjectId, ref: 'ServiceName' }) service: ServiceName;

    @Prop({ type: Number })
    dailyPrice: number;

    @Prop({ type: Number })
    weeklyPrice: number;

    @Prop({ type: Number })
    montlyPrice: number;
}

export const HostServiceSchema = SchemaFactory.createForClass(HostService);

/*
    {
        service: "hebele",
        dailyPrice: 0,
        weeklyPrice: 0,
        montlyPrice: 0,
        _id: "çükübik"
    }
*/