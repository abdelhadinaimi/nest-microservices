import { REDIS, AMQ } from "../app.constants";
import { Transport } from "@nestjs/common/enums/transport.enum";
import { ClientProviderOptions } from "@nestjs/microservices/module/interfaces/clients-module.interface";

export class ConfigService {

  public getRabitMQOptions(): ClientProviderOptions {
    return {
      name: AMQ.PROXY_NAME,
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${AMQ.HOST}:${AMQ.PASS}@${AMQ.HOST}:${AMQ.PORT}`],
        queue: 'users_queue',
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