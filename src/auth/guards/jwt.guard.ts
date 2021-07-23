import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import config from 'src/utils/config';
import { promisify } from 'util';

@Injectable()
export class JWTLoginGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    // const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();

    await super.logIn(request);
    return true;
  }
}

@Injectable()
export class JWTRestAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);
    const checkJwt = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${config.AUTH0_ISSUER}.well-know/jwks.json`,
        }),
        audience: config.AUTH0_AUDIENCE,
        issuer: config.AUTH0_ISSUER,
        algorithms: ['RS256'],
      }),
    );
    try {
      await checkJwt(req, res);
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    // const request = context.switchToHttp().getRequest();
    // return await request.isAuthenticated();
  }
}
