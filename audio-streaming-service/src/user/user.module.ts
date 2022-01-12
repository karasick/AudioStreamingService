import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./schemas/user.model";
import {Profile, ProfileSchema} from "./schemas/profile.model";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    MongooseModule.forFeature([{name: Profile.name, schema: ProfileSchema}]),
  ],
  exports: [UserService]
})
export class UserModule {}
