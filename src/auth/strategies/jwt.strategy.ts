import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import config from 'src/utils/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: config.JWKS_URI,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: 'http:localhost:8000',
      issuer: config.AUTH0_ISSUER,
      algorithms: ['RS256'],
      // secretOrKey: config.SECRET,
    });
  }

  validate(payload: unknown): unknown {
    console.log(payload);
    return payload;
  }
}
