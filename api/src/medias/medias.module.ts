import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AMQ_SERVICE } from '../app.constants';
import { MediasController } from './medias.controller';
import { MediasService } from './medias.service';

@Module({
  imports: [
    ClientsModule.register([{
      name: AMQ_SERVICE,
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://user:bitnami@localhost:5672`],
        queue: 'medias_queue',
        queueOptions: { durable: false },
      },
    }]),
  ],
  controllers: [MediasController],
  providers: [MediasService],
})
export class MediasModule {}
