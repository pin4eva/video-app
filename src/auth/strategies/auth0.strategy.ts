import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy, StrategyOption } from 'passport-auth0';
import { passportJwtSecret } from 'jwks-rsa';
import config from 'src/utils/config';

const options: StrategyOption = {
  callbackURL: 'http://localhost:8000/api/v1',
  clientID: config.AUTH0_CLIENTID,
  clientSecret: config.AUTH0_SECRET,
  domain: config.AUTH0_ISSUER,
};

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: config.JWKS_URI,
      }),
      callbackURL: 'http://localhost:8000/api/v1',
      clientID: config.AUTH0_CLIENTID,
      clientSecret: config.AUTH0_SECRET,
      domain: config.AUTH0_ISSUER,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: 'http:localhost:8000',
      issuer: config.AUTH0_ISSUER,
      algorithms: ['RS256'],
    });
  }

  validate(payload: unknown): unknown {
    return payload;
  }
}
