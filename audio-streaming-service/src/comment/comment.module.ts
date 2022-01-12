import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Comment, CommentSchema} from "./schemas/comment.model";

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
    MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}]),
  ]
})
export class CommentModule {}
