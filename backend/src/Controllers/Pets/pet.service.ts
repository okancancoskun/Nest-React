import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PetDto } from '../../libs/dtos';
import { Pet } from '../../models/PetSchema';

@Injectable()
export class PetService { 
    constructor(@InjectModel(Pet.name) private readonly petModel:Model<Pet>){}

    async createPet(pet:PetDto):Promise<Pet>{
        const newPet = new this.petModel(pet);
        return await newPet.save();
    }

}
