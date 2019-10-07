import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MATH_SERVICE } from './app.constants';

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

@Module({
  imports: [
    ClientsModule.register([{
      name: MATH_SERVICE, transport: Transport.REDIS,
      options: { url: `redis://${REDIS_HOST}:${REDIS_PORT}` }
    }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
