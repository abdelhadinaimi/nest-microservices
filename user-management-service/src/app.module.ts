import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
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
    UsersModule,
    ConfigModule,
    MongooseModule.forRoot(`mongodb://${MONGO.USER}:${MONGO.PASS}@${MONGO.HOST}:${MONGO.PORT}/usersDB`, mongodbOptions),
  ]
})
export class AppModule { }
