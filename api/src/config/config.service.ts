import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { ClientProviderOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { AMQ_PROXY } from '../app.constants';
import { Injectable, Logger } from '@nestjs/common';

const AMQ_HOST = process.env.AMQ_HOST || 'localhost';
const AMQ_PORT = process.env.AMQ_PORT || 5672;
const AMQ_USER = process.env.AMQ_USER || 'user';
const AMQ_PASSWORD = process.env.AMQ_PASSWORD || 'bitnami';

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
      name: AMQ_PROXY,
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${AMQ_USER}:${AMQ_PASSWORD}@${AMQ_HOST}:${AMQ_PORT}`],
        queue: queueName,
        queueOptions: { durable: false },
      },
    }
  }
}