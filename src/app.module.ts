import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/video', {
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    VideoModule,
    UserModule,
    AuthModule,
    MulterModule.register({ dest: './upload' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
