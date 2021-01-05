import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceName,serviceNameSchema } from 'src/models/ServiceNameSchema';
import { ServiceNameService } from './servicename.service';

@Module({
    imports: [MongooseModule.forFeature(
        [
            {name:ServiceName.name,schema:serviceNameSchema}
        ]
    )],
    providers: [ServiceNameService],
    exports:[ServiceNameService]
})
export class ServiceNameModule { }
