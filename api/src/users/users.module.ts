import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { REDIS } from '../app.constants';
import { ConfigService } from '../config/config.service';


@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: REDIS.PROXY_NAME,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.getRedisOptions());
      },
      inject: [ConfigService],
    },
  ],
})
export class UsersModule { }