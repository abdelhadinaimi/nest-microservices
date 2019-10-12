import { Module } from '@nestjs/common';
import { MediasModule } from './medias/medias.module';
import { ConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MediasModule,
    ConfigModule,
    MongooseModule.forRoot('mongodb://medias_user:medias_pass@localhost:27017/mediasDB', { useNewUrlParser: true }),
  ]
})
export class AppModule { }
