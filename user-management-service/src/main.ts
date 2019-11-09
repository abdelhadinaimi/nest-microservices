import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import {ExpressAdapter} from '@nestjs/platform-express';
import * as Express from 'express';

import { REDIS } from './app.constants';
import { Logger } from '@nestjs/common';

const server = Express();
server.get('/', (req,res) => res.send('ok'));
server.get('/_ah/health',(req,res) => res.send('ok'));

async function bootstrap() {
  const app = await NestFactory.create(AppModule,new ExpressAdapter(server));
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: `redis://${REDIS.HOST}:${REDIS.PORT}`,
      retryAttempts: 5,
      retryDelay: 1000,
    },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(process.env.PORT);
}
bootstrap();
