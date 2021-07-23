import { ApiBody, ApiProperty, ApiQuery, PartialType } from '@nestjs/swagger';
import { VideoStatusEnum } from '../interface/video.interface';

export class CreateVideoDTO {
  @ApiProperty()
  title: string;
  @ApiProperty({ type: 'multipart/form-data' })
  url: Express.Multer.File;
  @ApiProperty()
  description: string;
  @ApiProperty({ type: [String] })
  tags: string[];
  @ApiProperty({
    enum: VideoStatusEnum,
    default: VideoStatusEnum.UNLISTED,
    required: false,
  })
  status: string;
}

export class UpdateVideoDTO extends PartialType(CreateVideoDTO) {
  @ApiProperty()
  id: string;
}

export class LikeVideDTO {
  @ApiProperty({ required: true })
  video_id: string;
}

export class ChangeVideoStatusDTO {
  @ApiProperty()
  video_id: string;
  @ApiProperty({ enum: VideoStatusEnum, name: 'status' })
  status: string;
}
