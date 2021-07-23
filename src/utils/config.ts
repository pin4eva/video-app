import * as dotenv from 'dotenv';
import { registerAs } from '@nestjs/config';
dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/video',
  AUTH0_ISSUER: process.env.AUTH0_ISSUER,
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
  SECRET: process.env.SECRET || 'som3thingStrong',
  JWKS_URI: process.env.JWKS_URI,
  AUTH0_CLIENTID: process.env.AUTH0_CLIENTID,
  AUTH0_SECRET: process.env.AUTH0_CLIENT_SECRET,
};

// export const Auth0Config = {
//   domain: process.env.AUTH0_DOMAIN,
//   clientId: process.env.AUTH0_CLIENTID,
//   clientSecret: process.env.AUTH0_CLIENT_SECRET,
//   audience: process.env.AUTH0_AUDIENCE,
// };

export default config;
