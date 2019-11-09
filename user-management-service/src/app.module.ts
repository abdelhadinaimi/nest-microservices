import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

const mongodbOptions: MongooseModuleOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
@Module({
  imports: [
    UsersModule,
    ConfigModule,
    MongooseModule.forRoot(process.env.MONGO_URI, mongodbOptions),
  ]
})
export class AppModule { }
