import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { UsersController } from './users.controller';
import { QueryHandlers } from './queries/handlers';
import { UserRepository } from './repository/user.repository';
import { UsersSagas } from './sagas/users.sagas';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AMQ_PROXY } from '../app.constants';
import { ConfigService } from '../config/config.service';

const AMQ_HOST = process.env.AMQ_HOST || 'localhost';
const AMQ_PORT = process.env.AMQ_PORT || 5672;
const AMQ_USER = process.env.AMQ_USER || 'user';
const AMQ_PASSWORD = process.env.AMQ_PASSWORD || 'bitnami';

@Module({
  imports: [
    CqrsModule,
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: AMQ_PROXY,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.getRabitMQOptions());
      },
      inject: [ConfigService],
    },
    UserRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    UsersSagas,
  ],
})
export class UsersModule { }