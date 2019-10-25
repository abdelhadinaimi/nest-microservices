import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || '27018';
const MONGO_USER = process.env.MONGO_USER || 'users_user';
const MONGO_PASS = process.env.MONGO_PASS || 'users_pass';

const mongodbOptions: MongooseModuleOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
@Module({
  imports: [
    UsersModule,
    ConfigModule,
    MongooseModule.forRoot(`mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/usersDB`, mongodbOptions),
  ]
})
export class AppModule { }
