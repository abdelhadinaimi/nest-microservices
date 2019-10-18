import { AMQ_PROXY } from "../app.constants";
import { Transport } from "@nestjs/common/enums/transport.enum";
import { ClientProviderOptions } from "@nestjs/microservices/module/interfaces/clients-module.interface";

const AMQ_HOST = process.env.AMQ_HOST || 'localhost';
const AMQ_PORT = process.env.AMQ_PORT || 5672;
const AMQ_USER = process.env.AMQ_USER || 'user';
const AMQ_PASSWORD = process.env.AMQ_PASSWORD || 'bitnami';

export class ConfigService {
  
  public getRabitMQOptions(): ClientProviderOptions {
    return {
      name: AMQ_PROXY,
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${AMQ_USER}:${AMQ_PASSWORD}@${AMQ_HOST}:${AMQ_PORT}`],
        queue: 'medias_queue',
        queueOptions: { durable: false },
      },
    }
  }
  
}