import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDTO {
  @ApiProperty({ required: true })
  body: string;
  @ApiProperty({ required: true })
  video: string;
}

export class UpdateCommentDTO extends PartialType(CreateCommentDTO) {
  @ApiProperty()
  id: string;
}

export class LikeCommentDT {
  @ApiProperty()
  comment_id: string;
}
