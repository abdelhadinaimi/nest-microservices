import { Module, Logger } from '@nestjs/common';
import { MediasModule } from './medias/medias.module';
import { ConfigModule } from './config/config.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || '27017';
const MONGO_USER = process.env.MONGO_USER || 'medias_user';
const MONGO_PASS = process.env.MONGO_PASS || 'medias_pass';

const mongodbOptions: MongooseModuleOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
@Module({
  imports: [
    MediasModule,
    ConfigModule,
    MongooseModule.forRoot(`mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/mediasDB`, mongodbOptions),
  ]
})
export class AppModule { }
