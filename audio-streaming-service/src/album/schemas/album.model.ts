import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {User} from "../../user/schemas/user.model";
import {AlbumTrack} from "../../track/schemas/album-track.model";

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
    @Prop()
    type: string

    @Prop()
    name: string

    @Prop()
    description: string

    @Prop()
    coverImage: string

    @Prop({type: Types.ObjectId, ref: 'User'})
    user: User

    @Prop({type: [{type: Types.ObjectId, ref: 'TrackInAlbum'}]})
    tracks: AlbumTrack[]
}

export const AlbumSchema = SchemaFactory.createForClass(Album);