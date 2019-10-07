import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

async function bootstrap() {
  // const app = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.REDIS,
  //   options: {
  //     retryAttempts: 5,
  //     retryDelay: 1000,
  //     url: `redis://${REDIS_HOST}:${REDIS_PORT}`
  //   }
  // });

  // await app.listenAsync();

  const app = await NestFactory.create(AppModule);
  app.listen(3000, () => console.log('Application is listening on port 3000.'));
}
bootstrap();
