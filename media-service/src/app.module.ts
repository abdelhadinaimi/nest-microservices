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
    // MONGODB CONNECTING EXAMPLE URI:  mongodb://username:password@mongodb-host:mongodb-port
    MongooseModule.forRoot("mongodb://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_HOST + ":" + process.env.MONGO_PORT, mongodbOptions),
  ]
})
export class AppModule { }
