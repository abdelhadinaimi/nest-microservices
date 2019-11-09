import { ClientProviderOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { REDIS, AMQ } from '../app.constants';

export class ConfigService {

  getRabitMQOptions(queueName: string): ClientProviderOptions {
    return {
      name: AMQ.PROXY_NAME,
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${AMQ.USER}:${AMQ.PASS}@${AMQ.HOST}:${AMQ.PORT}`],
        queue: queueName,
        queueOptions: { durable: false },
      },
    }
  }

  public getRedisOptions(): ClientProviderOptions {
    return {
      name: REDIS.PROXY_NAME,
      transport: Transport.REDIS,
      options: {
        retryAttempts: 5,
        retryDelay: 1000,
        url: `redis://${REDIS.HOST}:${REDIS.PORT}`
      },
    }
  }
}