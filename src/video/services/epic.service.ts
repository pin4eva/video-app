import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/user/schema/user.schema';
import { AddVideoToEpic, CreateEpicDTO, UpdateEpicDTO } from '../dto/epic.dto';
import { Epic, IEpic } from '../schema/epic.schema';

@Injectable()
export class EpicService {
  constructor(
    @InjectModel(Epic.name) private readonly epicModel: Model<IEpic>,
  ) {}

  async create(data: CreateEpicDTO, user: IUser): Promise<IEpic> {
    try {
      const epic = await this.epicModel.create({ ...data, owner: user.id });
      return epic;
    } catch (error) {
      throw error;
    }
  }
  async update(data: UpdateEpicDTO): Promise<IEpic> {
    try {
      const epic = await this.epicModel.findByIdAndUpdate(
        data.id,
        { ...data },
        { new: true },
      );
      return epic;
      return epic;
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<IEpic[]> {
    try {
      const epics = await this.epicModel.find();
      return epics;
    } catch (error) {
      throw error;
    }
  }
  async findByOwner(owner: any): Promise<IEpic[]> {
    try {
      const epics = await this.epicModel.find({ owner });
      return epics;
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string): Promise<IEpic> {
    try {
      const epic = await this.epicModel.findById(id);
      if (!epic) throw new NotFoundException('No record found');
      return epic;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<IEpic> {
    try {
      const epic = await this.epicModel.findByIdAndRemove(id);
      return epic;
    } catch (error) {
      throw error;
    }
  }
  async addVideoToEpic(data: AddVideoToEpic): Promise<IEpic> {
    try {
      const epic = await this.epicModel.findByIdAndUpdate(
        data.epic_id,
        { $addToSet: { videos: data.video_id } },
        { new: true },
      );
      return epic;
    } catch (error) {
      throw error;
    }
  }
  async removeVideoFromEpic(data: AddVideoToEpic): Promise<IEpic> {
    try {
      const epic = await this.epicModel.findByIdAndUpdate(
        data.epic_id,
        { $pull: { videos: data.video_id } },
        { new: true },
      );
      return epic;
    } catch (error) {
      throw error;
    }
  }
}
