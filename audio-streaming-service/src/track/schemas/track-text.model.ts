import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {Track} from "./track.model";

export type TrackTextDocument = TrackText & Document;

@Schema()
export class TrackText {
    @Prop()
    language: string

    @Prop()
    text: string;

    @Prop({type: Types.ObjectId, ref: 'Track'})
    track: Track
}

export const TrackTextSchema = SchemaFactory.createForClass(TrackText);