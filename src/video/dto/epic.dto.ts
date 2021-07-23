import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEpicDTO {
  @ApiProperty()
  name: string;
}

export class UpdateEpicDTO extends PartialType(CreateEpicDTO) {
  @ApiProperty()
  id: string;
}

export class AddVideoToEpic {
  @ApiProperty()
  video_id: string;
  @ApiProperty()
  epic_id: string;
}
