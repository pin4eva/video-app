import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as session from 'express-session';
import config from './utils/config';
import * as passport from 'passport';
import MongoStore = require('connect-mongo');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api/v1');
  const swaqqgerConfig = new DocumentBuilder()
    .setTitle('Video-app Api')
    .setDescription('video API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaqqgerConfig);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // app.enableCors({
  //   origin: ['http://localhost:3001', 'http://localhost:3000'],
  //   credentials: true,
  // });

  app.use(
    session({
      secret: config.SECRET,
      name: '__ed',
      saveUninitialized: false,
      resave: false,
      store: MongoStore.create({
        mongoUrl: config.MONGO_URI,
        ttl: 2 * 24 * 60 * 60,
        autoRemove: 'native',
        // mongoOptions: mongooseOption,
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'public/views'));
  app.setViewEngine('hbs');
  await app.listen(8000);
}
bootstrap();
