import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { LocalRestAuthGuard } from 'src/auth/guards/local.guard';
import { ReqWithUser } from 'src/typings';
import { editFileName, videoFilter } from 'src/utils/videoUtils';
import { VideoService } from 'src/video/services/video.service';
import {
  ChangeVideoStatusDTO,
  CreateVideoDTO,
  LikeVideDTO,
  UpdateVideoDTO,
} from '../dto/video.dto';
import { VideoStatusEnum } from '../interface/video.interface';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  async findAll() {
    return await this.videoService.findAll();
  }
  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return await this.videoService.findOne(id);
  }

  @UseGuards(LocalRestAuthGuard)
  @Put('single/:id')
  async update(@Body() data: UpdateVideoDTO) {
    return await this.videoService.update(data);
  }

  @UseGuards(LocalRestAuthGuard)
  @Delete('single/:id')
  async delete(@Body() id: string) {
    return await this.videoService.delete(id);
  }
  @UseGuards(LocalRestAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('url', {
      storage: diskStorage({
        destination: './upload',
        filename: editFileName,
      }),
      fileFilter: videoFilter,
    }),
  )
  async createVideo(
    @UploadedFile() url: Express.Multer.File,
    @Body() data: CreateVideoDTO,
    @Req() req: ReqWithUser,
  ) {
    return await this.videoService.createVideo({ ...data, url }, req.user);
  }
  @Get(':id')
  async singleVideo(@Param('id') id: string, @Res() res: Response) {
    return res.sendFile(id, { root: './upload' });
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: editFileName,
      }),
      fileFilter: videoFilter,
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
  ) {
    return {
      title,
      originalname: file.originalname,
      filename: file.filename,
    };
  }
  @UseGuards(LocalRestAuthGuard)
  @Post('like')
  async likeVideo(@Body() data: LikeVideDTO, @Req() req: ReqWithUser) {
    return await this.videoService.likeVideo(data, req.user);
  }
  @UseGuards(LocalRestAuthGuard)
  @Post('unlike')
  async unLikeVideo(@Body() data: LikeVideDTO, @Req() req: ReqWithUser) {
    return await this.videoService.unLikeVideo(data, req.user);
  }
  @UseGuards(LocalRestAuthGuard)
  // @ApiQuery({ name: 'status', enum: VideoStatusEnum })
  @Post('status')
  async changeStatus(
    @Body() data: ChangeVideoStatusDTO,
    // @Query('status') status: VideoStatusEnum,
  ) {
    return await this.videoService.changeStatus(data);
  }
}
