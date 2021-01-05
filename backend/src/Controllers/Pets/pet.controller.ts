import { Body, Controller, Post } from '@nestjs/common';
import { PetDto } from '../../libs/dtos';
import { IPet } from '../../libs/interfaces'
import { PetService } from './pet.service';

@Controller('pet')
export class PetController { 
    constructor(private readonly petService: PetService){}

    @Post('newPet')
    async create(@Body() body:PetDto): Promise<IPet>{
        return await this.petService.createPet(body)
    }
}
