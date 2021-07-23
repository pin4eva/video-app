import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { Video } from './video.schema';

export type IEpic = Epic &
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
export class Epic {
  @Prop({ required: true })
  name: string;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Video' }] })
  videos: Video[];
  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: User;
}

export const EpicSchema = SchemaFactory.createForClass(Epic);
