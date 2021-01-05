import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HostService, HostServiceSchema } from 'src/models/HostServiceSchema';
import { UserModule } from '../User/user.module';
import { HostServiceService } from './hostservice.service';

@Module({
    imports: [MongooseModule.forFeature(
        [
            {name:HostService.name,schema:HostServiceSchema}
        ]
    ), UserModule
],
    providers: [HostServiceService],
    exports:[HostServiceService]
})
export class HostServiceModule { }
