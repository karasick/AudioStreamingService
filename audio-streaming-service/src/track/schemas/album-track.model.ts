import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {Album} from "../../album/schemas/album.model";
import {Track} from "./track.model";

export type AlbumTrackDocument = AlbumTrack & Document;

@Schema()
export class AlbumTrack {
    @Prop()
    disk: number;

    @Prop()
    itemInOrder: number;

    @Prop({type: Types.ObjectId, ref: 'Album'})
    album: Album;

    @Prop({type: Types.ObjectId, ref: 'Track'})
    track: Track
}

export const AlbumTrackSchema = SchemaFactory.createForClass(AlbumTrack);