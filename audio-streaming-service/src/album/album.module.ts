import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Album, AlbumSchema} from "./schemas/album.model";

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [
    MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
  ]
})
export class AlbumModule {}
