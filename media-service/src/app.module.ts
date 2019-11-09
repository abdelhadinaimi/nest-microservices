import { Module, Logger } from '@nestjs/common';
import { MediasModule } from './medias/medias.module';
import { ConfigModule } from './config/config.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

const mongodbOptions: MongooseModuleOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
@Module({
  imports: [
    MediasModule,
    ConfigModule,
    MongooseModule.forRoot(process.env.MONGO_URI, mongodbOptions),
  ]
})
export class AppModule { }
