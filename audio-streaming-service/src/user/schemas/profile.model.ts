import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {User} from "./user.model";

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
    @Prop({required: true, unique: true})
    username: string;

    @Prop()
    bio: string;

    @Prop()
    profilePicture: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);