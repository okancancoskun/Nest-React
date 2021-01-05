import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { User, UserSchema } from 'src/models/UserSchema';
import { AuthService } from './auth.service';

@Module({
    imports: [MongooseModule.forFeature(
        [
            {name:User.name,schema:UserSchema}
        ]
    )],
    providers: [AuthService],
    exports:[AuthService]
})
export class AuthModule {}
