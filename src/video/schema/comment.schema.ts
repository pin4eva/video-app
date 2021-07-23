import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { Video } from './video.schema';

export type IComment = Comment &
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
export class Comment {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  likes: string[];
  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: User;
  @Prop({ type: Types.ObjectId, ref: 'Video' })
  video: Video;
  @Prop({ required: true })
  body: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
