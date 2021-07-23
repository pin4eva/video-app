import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { VideoStatusEnum } from '../interface/video.interface';
import { Comment } from './comment.schema';

export type IVideo = Video &
  Document & {
    _doc: any;
  };

@ObjectType()
@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;

      return ret;
    },
  },
})
export class Video {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  likes: string[];
  @Prop()
  rate: number;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop()
  views: string[];
  @Prop()
  duration: string;
  @Prop()
  url: string;
  @Prop()
  tags: string[];
  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: User;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
  @Prop({
    type: String,
    enum: VideoStatusEnum,
    default: VideoStatusEnum.UNLISTED,
  })
  status: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
