import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/user/schema/user.schema';
import {
  ChangeVideoStatusDTO,
  CreateVideoDTO,
  LikeVideDTO,
  UpdateVideoDTO,
} from '../dto/video.dto';
import { IVideo, Video } from '../schema/video.schema';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<IVideo>,
  ) {}

  async createVideo(data: CreateVideoDTO, user: IUser): Promise<IVideo> {
    try {
      const video = await this.videoModel.create({
        ...data,
        owner: user.id,
        url: data.url.path,
      });
      return video;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<IVideo[]> {
    try {
      const videos = await this.videoModel.find();
      return videos;
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string): Promise<IVideo> {
    try {
      const video = await this.videoModel.findById(id);
      if (!video) throw new NotFoundException('video not found');
      return video;
    } catch (error) {
      throw error;
    }
  }
  async update(data: Partial<UpdateVideoDTO>): Promise<IVideo> {
    try {
      const video = await this.videoModel.findByIdAndUpdate(
        data.id,
        data as any,
        {
          new: true,
        },
      );
      return video;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<IVideo> {
    try {
      const video = await this.findOne(id);
      video.remove();
      return video;
    } catch (error) {
      throw error;
    }
  }
  async likeVideo(data: LikeVideDTO, user: IUser): Promise<IVideo> {
    try {
      const video = await this.videoModel.findByIdAndUpdate(
        data.video_id,
        {
          $addToSet: { likes: user.id },
        },
        { new: true },
      );
      return video;
    } catch (error) {
      throw error;
    }
  }
  async unLikeVideo(data: LikeVideDTO, user: IUser): Promise<IVideo> {
    try {
      const video = await this.videoModel.findByIdAndUpdate(
        data.video_id,
        {
          $pull: { likes: user.id },
        },
        { new: true },
      );
      return video;
    } catch (error) {
      throw error;
    }
  }
  async changeStatus(data: ChangeVideoStatusDTO): Promise<IVideo> {
    try {
      const video = await this.videoModel.findByIdAndUpdate(data.video_id, {
        $set: { status: data.status },
      });
      return video;
    } catch (error) {
      throw error;
    }
  }
}
