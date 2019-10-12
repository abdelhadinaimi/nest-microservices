import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AMQ_PROXY } from '../app.constants';
import { ConfigService } from '../config/config.service';


@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: AMQ_PROXY,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.getRabitMQOptions('users_queue'));
      },
      inject: [ConfigService],
    },
  ],
})
export class UsersModule { }