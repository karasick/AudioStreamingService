import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {Track} from "./track.model";

export type TrackStatisticDocument = TrackStatistic & Document;

@Schema()
export class TrackStatistic {
    @Prop()
    listeners: number;

    @Prop()
    likes: number;

    @Prop({type: Types.ObjectId, ref: 'Track'})
    track: Track
}

export const TrackStatisticSchema = SchemaFactory.createForClass(TrackStatistic);