import { ServiceNameModule } from './Controllers/ServiceName/servicename.module';
import { ServiceNameController } from './Controllers/ServiceName/servicename.controller';
import { HostServiceController } from './Controllers/HostServices/hostservice.controller';
import { HostServiceModule } from './Controllers/HostServices/hostservice.module';
import { PetController } from './Controllers/Pets/pet.controller';
import { PetModule } from './Controllers/Pets/pet.module';
import { CommentController } from './Controllers/Comment/comment.controller';
import { CommentModule } from './Controllers/Comment/comment.module';
import { AuthController } from './Controllers/Auth/auth.controller';
import { AuthModule } from './Controllers/Auth/auth.module';
import { UserController } from './Controllers/User/user.controller';
import { UserModule } from './Controllers/User/user.module';
import { PostModule } from './Controllers/Post/post.module';
import { PostController } from './Controllers/Post/post.controller';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose"
import environment from "./environment";
import { AuthMiddleware } from './libs/middlewares/auth.middleware';
import { UploadModule } from './Controllers/Upload/upload.module';
import { UploadController } from './Controllers/Upload/upload.controller';
import { MulterModule } from "@nestjs/platform-express"

@Module({
  imports: [
    ServiceNameModule,
    HostServiceModule,
    PetModule,
    AuthModule,
    UserModule,
    CommentModule,
    PostModule,
    MulterModule.register({
      dest: './images'
    }),
    UploadModule,
    MongooseModule.forRoot(environment.mongoUrl)],
  controllers: [
    ServiceNameController,
    HostServiceController,
    PetController,
    CommentController,
    AuthController,
    UserController,
    PostController,
    UploadController,
    AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(CommentController, UserController)
  }
}
