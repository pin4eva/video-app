import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LocalRestAuthGuard } from 'src/auth/guards/local.guard';
import { ReqWithUser } from 'src/typings';
import { AddVideoToEpic, CreateEpicDTO, UpdateEpicDTO } from '../dto/epic.dto';
import { EpicService } from '../services/epic.service';

@Controller('epic')
export class EpicController {
  constructor(private epicService: EpicService) {}

  @UseGuards(LocalRestAuthGuard)
  @Post()
  async create(@Body() data: CreateEpicDTO, @Req() req: ReqWithUser) {
    return await this.epicService.create(data, req.user);
  }
  @UseGuards(LocalRestAuthGuard)
  @Put()
  async update(@Body() data: UpdateEpicDTO) {
    return await this.epicService.update(data);
  }
  @Get()
  async findAll() {
    return await this.epicService.findAll();
  }
  @Get('owner/:id')
  async findByOwner(@Param('id') id: string) {
    return await this.epicService.findByOwner(id);
  }
  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return await this.epicService.findOne(id);
  }
  @Delete('single/:id')
  async delete(@Param('id') id: string) {
    return await this.epicService.delete(id);
  }
  @UseGuards(LocalRestAuthGuard)
  @Post('video/add')
  async addVideoToEpic(data: AddVideoToEpic) {
    return await this.epicService.addVideoToEpic(data);
  }
  @UseGuards(LocalRestAuthGuard)
  @Post('video/remove')
  async removeVideoFromEpic(data: AddVideoToEpic) {
    return await this.epicService.removeVideoFromEpic(data);
  }
}
