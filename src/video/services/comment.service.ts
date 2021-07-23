import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/user/schema/user.schema';
import {
  CreateCommentDTO,
  LikeCommentDT,
  UpdateCommentDTO,
} from '../dto/comment.dto';
import { Comment, IComment } from '../schema/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<IComment>,
  ) {}

  async create(data: CreateCommentDTO, user: IUser): Promise<IComment> {
    try {
      const comment = await this.commentModel.create({
        ...data,
        author: user.id,
      });
      return comment;
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<IComment[]> {
    try {
      const comments = await this.commentModel.find();
      return comments;
    } catch (error) {
      throw error;
    }
  }
  async findByVideo(videoUrl: any): Promise<IComment[]> {
    try {
      const comments = await this.commentModel.find({ video: videoUrl });
      return comments;
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string): Promise<IComment> {
    try {
      const comment = await this.commentModel.findById(id);
      if (!comment) throw new NotFoundException('No record found');
      return comment;
    } catch (error) {
      throw error;
    }
  }
  async update(data: UpdateCommentDTO): Promise<IComment> {
    try {
      const comment = await this.commentModel.findByIdAndUpdate(
        data.id,
        data as any,
        {
          new: true,
        },
      );
      return comment;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<IComment> {
    try {
      const comment = await this.findOne(id);
      comment.remove();
      return comment;
    } catch (error) {
      throw error;
    }
  }
  async likeComment(data: LikeCommentDT, user: IUser): Promise<IComment> {
    try {
      const comment = await this.commentModel.findByIdAndUpdate(
        data.comment_id,
        {
          $addToSet: { likes: user.id },
        },
        { new: true },
      );
      return comment;
    } catch (error) {
      throw error;
    }
  }
  async unLikeComment(data: LikeCommentDT, user: IUser): Promise<IComment> {
    try {
      const comment = await this.commentModel.findByIdAndUpdate(
        data.comment_id,
        {
          $pull: { likes: user.id },
        },
        { new: true },
      );
      return comment;
    } catch (error) {
      throw error;
    }
  }
}
