import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('upload/:id')
  async singleVideo(@Param('id') id: string, @Res() res: Response) {
    return res.sendFile(id, { root: './upload' });
  }
}
