import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { ClientProviderOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { REDIS, AMQ } from '../app.constants';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    try {
      this.envConfig = dotenv.parse(fs.readFileSync(filePath));;
    } catch (e) {
      Logger.error(`${filePath} file doens't exist please add it.`);
    }
    finally {
      this.envConfig = {};
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }

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