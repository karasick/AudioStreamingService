import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {Profile} from "./profile.model";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({default: 'user'})
    type: string

    @Prop({type: Types.ObjectId, ref: 'Profile'})
    profile: Profile
}

export const UserSchema = SchemaFactory.createForClass(User);