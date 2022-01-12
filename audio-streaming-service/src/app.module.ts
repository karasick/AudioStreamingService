import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import {MongooseModule} from "@nestjs/mongoose";
import { CommentModule } from './comment/comment.module';
import {ConfigModule} from "@nestjs/config";
import { AlbumModule } from './album/album.module';
import { AuthModule } from './auth/auth.module';
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./auth/guards/jwt-auth.guard";

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: (process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '') + '.env'
    }),
    MongooseModule.forRoot(`${process.env.MONGODB_LINK}`),
    TrackModule,
    UserModule,
    CommentModule,
    AlbumModule,
    AuthModule,
  ],
})
export class AppModule {}
