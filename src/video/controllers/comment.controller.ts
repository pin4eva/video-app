import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LocalRestAuthGuard } from 'src/auth/guards/local.guard';
import { ReqWithUser } from 'src/typings';
import { CreateCommentDTO, LikeCommentDT } from '../dto/comment.dto';
import { CommentService } from '../services/comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(LocalRestAuthGuard)
  @Post()
  async create(@Body() data: CreateCommentDTO, @Req() req: ReqWithUser) {
    return await this.commentService.create(data, req.user);
  }
  @Get()
  async findAll() {
    return await this.commentService.findAll();
  }
  @Get('video/:id')
  async findByVideo(@Param('id') id: string) {
    return await this.commentService.findByVideo(id);
  }
  @UseGuards(LocalRestAuthGuard)
  @Post('like')
  async likeVideo(@Body() data: LikeCommentDT, @Req() req: ReqWithUser) {
    return await this.commentService.likeComment(data, req.user);
  }
  @UseGuards(LocalRestAuthGuard)
  @Post('unlike')
  async unLikeVideo(@Body() data: LikeCommentDT, @Req() req: ReqWithUser) {
    return await this.commentService.unLikeComment(data, req.user);
  }
}
