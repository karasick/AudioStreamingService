import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {User} from "../../user/schemas/user.model";
import {TrackText} from "./track-text.model";
import {Comment} from "../../comment/schemas/comment.model";

export type TrackDocument = Track & Document;

@Schema()
export class Track {
    @Prop()
    name: string;

    @Prop()
    audio: string;

    @Prop({type: Types.ObjectId, ref: 'User'})
    author: User;

    @Prop({type: [{type: Types.ObjectId, ref: 'User'}]})
    contributors: User[]

    @Prop({type: [{type: Types.ObjectId, ref: 'TrackText'}]})
    texts: TrackText[]

    @Prop({type: [{type: Types.ObjectId, ref: 'Comment'}]})
    comments: Comment[]
}

export const TrackSchema = SchemaFactory.createForClass(Track);