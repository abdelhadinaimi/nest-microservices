import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REDIS_SERVICE } from './users.constants';

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

@Module({
  imports: [
    ClientsModule.register([{
      name: REDIS_SERVICE,
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://user:bitnami@rabbitmq:5672`],
        queue: 'users_queue',
        queueOptions: { durable: false },
      },
    }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }