import { Module, Logger } from '@nestjs/common';
import { MediasModule } from './medias/medias.module';
import { ConfigModule } from './config/config.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MONGO } from './app.constants';

const mongodbOptions: MongooseModuleOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
@Module({
  imports: [
    MediasModule,
    ConfigModule,
    MongooseModule.forRoot(`mongodb://${MONGO.USER}:${MONGO.PASS}@${MONGO.HOST}:${MONGO.PORT}/${MONGO.NAME}`, mongodbOptions),
  ]
})
export class AppModule { }
