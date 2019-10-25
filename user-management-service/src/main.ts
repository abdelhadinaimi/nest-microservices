import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

const AMQ_HOST = process.env.AMQ_HOST || 'localhost';
const AMQ_PORT = process.env.AMQ_PORT || 5672;
const AMQ_USER = process.env.AMQ_USER || 'user_service';
const AMQ_PASSWORD = process.env.AMQ_PASSWORD || 'user_service';

async function bootstrap() {
  
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${AMQ_USER}:${AMQ_PASSWORD}@${AMQ_HOST}:${AMQ_PORT}`],
      queue: 'users_queue',
      queueOptions: { durable: false },
    },
  });
  
  await app.listenAsync();

  // const app = await NestFactory.create(AppModule);
  // app.listen(3000, () => console.log('Application is listening on port 3000.'));
}
bootstrap();
