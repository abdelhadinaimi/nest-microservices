import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {ExpressAdapter} from '@nestjs/platform-express';
import * as Express from 'express';

import { AppModule } from './app.module';


const server = Express();
server.get('/', (req,res) => res.send('ok'));
server.get('/_ah/health',(req,res) => res.send('ok'));

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
