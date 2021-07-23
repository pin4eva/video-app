import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportSerializer, PassportStrategy } from '@nestjs/passport';
import { verify } from 'jsonwebtoken';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';
import config from 'src/utils/config';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.loginWithEmail(email, password);

    if (!user) throw new UnauthorizedException('Access denied');

    return user;
  }
}

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }
  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ): any {
    done(null, payload);
  }
  async serializeUser(
    token: any,
    done: (err: Error, user: any) => void,
  ): Promise<any> {
    const payload = verify(token, config.SECRET) as any;
    const user = await this.userService.findOne(payload.id);

    done(null, user);
  }
}
