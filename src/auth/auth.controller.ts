import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import {
  CreateUserInput,
  LoginWithEmailDTO,
} from 'src/user/dto/create-user.input';
import { AuthService } from './auth.service';
import { LocalLoginGuard, LocalRestAuthGuard } from './guards/local.guard';
// import {} from 'auth0'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  @Render('login')
  home() {
    return;
  }
  @Get('register')
  @Render('register')
  register() {
    return;
  }
  @UseGuards(LocalLoginGuard)
  @Post('login')
  async login(@Body() data: LoginWithEmailDTO) {
    return await this.authService.loginWithEmail(data.email, data.password);
  }
  @Post('register')
  async registerWithEmail(@Body() data: CreateUserInput) {
    return await this.authService.create(data);
  }
  @UseGuards(LocalRestAuthGuard)
  @Get('me')
  async profile(@Req() req: Request) {
    return req.user;
  }
}
