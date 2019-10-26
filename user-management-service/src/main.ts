import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { REDIS } from './app.constants';



async function bootstrap() {

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: {
      url: `redis://${REDIS.HOST}:${REDIS.PORT}`,
      retryAttempts: 5,
      retryDelay: 1000,
    },
  });

  await app.listenAsync();

  // const app = await NestFactory.create(AppModule);
  // app.listen(3000, () => console.log('Application is listening on port 3000.'));
}
bootstrap();
