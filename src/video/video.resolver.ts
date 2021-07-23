import { Resolver } from '@nestjs/graphql';
import { VideoService } from './services/video.service';

@Resolver('Video')
export class VideoResolver {
  constructor(private readonly videoService: VideoService) {}
}
