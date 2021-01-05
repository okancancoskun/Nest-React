/* import { Model,Document } from "mongoose";
import { FilterModel } from "src/Models/FilterModel";


export class ResourceService<M extends Document, D extends any>{

    constructor(protected readonly mongoModel:Model<M>){}

    generalPaginating = {
        page: 1,
        size: 10,
    }
    async create(model: D): Promise<M> {
        const newModel = await new this.mongoModel(model);
        return await newModel.save();
    }

    async findAll(query?:FilterModel):Promise<M[]>{
        if(Object.keys(query).length !==0){
            const searchValue = await {...this.generalPaginating,...query};
            return await this.mongoModel
                .find()
                .limit(Math.max(0, searchValue.size))
                .skip(searchValue.size * (searchValue.page-1))
                .exec();
        }else{
            return await this.mongoModel.find().exec();
        }
    }

    async findOne(id:string):Promise<M>{
        return await this.mongoModel.findById(id);
    }
    async updateOne(id:string,modelDto:D){
        const findModel = await this.mongoModel.findById(id);
        await findModel.update(modelDto);
        return await this.mongoModel.findById(id).exec();
    }
} */