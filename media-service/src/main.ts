import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Inject, Logger } from '@nestjs/common';
import { ConfigService } from './config/config.service';

const AMQ_HOST = process.env.AMQ_HOST || 'localhost';
const AMQ_PORT = process.env.AMQ_PORT || 5672;
const AMQ_USER = process.env.AMQ_USER || 'media_service';
const AMQ_PASSWORD = process.env.AMQ_PASSWORD || 'media_service';

async function bootstrap() {

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${AMQ_USER}:${AMQ_PASSWORD}@${AMQ_HOST}:${AMQ_PORT}`],
      queue: 'medias_queue',
      queueOptions: { durable: false },
    },
  });

  await app.listenAsync();
}
bootstrap();
