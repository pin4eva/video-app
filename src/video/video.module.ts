import { Module } from '@nestjs/common';
import { VideoService } from './services/video.service';
import { VideoResolver } from './video.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './schema/video.schema';
import { CommentService } from './services/comment.service';
import { EpicService } from './services/epic.service';
import { Comment, CommentSchema } from './schema/comment.schema';
import { Epic, EpicSchema } from './schema/epic.schema';
import { VideoController } from './controllers/video.controller';
import { CommentController } from './controllers/comment.controller';
import { EpicController } from './controllers/epic.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Video.name, schema: VideoSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: Epic.name, schema: EpicSchema },
    ]),
  ],
  providers: [VideoResolver, VideoService, CommentService, EpicService],
  controllers: [VideoController, CommentController, EpicController],
})
export class VideoModule {}
