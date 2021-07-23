import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { IUser, User } from 'src/user/schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';
import jwt from 'express-jwt';
import config from 'src/utils/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<IUser>, // private jwtService: JwtService,
  ) {}

  async create(data: CreateUserInput): Promise<IUser> {
    const { password, email } = data;
    let user = await this.userModel.findOne({ email });
    if (user)
      throw new BadRequestException('Email already exist, signin instead');
    const payload: Partial<User> = {
      ...data,
      password: bcrypt.hashSync(password, 10),
    };
    try {
      user = await this.userModel.create(payload);

      delete user.password;
      return user;
    } catch (error) {
      throw error;
    }
  }

  async loginWithEmail(email: string, password: string) {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) throw new NotFoundException('You are not registered here');

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch)
        throw new UnauthorizedException('Email or password not correct');
      // delete user.password;
      const { id } = user;
      const token = sign({ id }, config.SECRET, {
        expiresIn: '1hr',
      });
      // console.log(user, token);

      return token;
    } catch (error) {
      throw error;
    }
  }
}
