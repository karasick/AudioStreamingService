import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {Track} from "../../track/schemas/track.model";
import {User} from "../../user/schemas/user.model";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @Prop()
    content: string;

    @Prop({type: Types.ObjectId, ref: 'User'})
    user: User

    @Prop({type: Types.ObjectId, ref: 'Track'})
    track: Track
}

export const CommentSchema = SchemaFactory.createForClass(Comment);