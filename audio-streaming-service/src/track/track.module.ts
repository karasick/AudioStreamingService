import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Track, TrackSchema} from "./schemas/track.model";
import {TrackText, TrackTextSchema} from "./schemas/track-text.model";
import {TrackStatistic, TrackStatisticSchema} from "./schemas/track-statistic.model";
import {AlbumTrack, AlbumTrackSchema} from "./schemas/album-track.model";

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [
    MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
    MongooseModule.forFeature([{name: TrackText.name, schema: TrackTextSchema}]),
    MongooseModule.forFeature([{name: TrackStatistic.name, schema: TrackStatisticSchema}]),
    MongooseModule.forFeature([{name: AlbumTrack.name, schema: AlbumTrackSchema}]),
  ]
})
export class TrackModule {}
