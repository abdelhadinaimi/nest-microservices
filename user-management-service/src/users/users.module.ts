import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { UsersController } from './users.controller';
import { QueryHandlers } from './queries/handlers';
import { UserRepository } from './repository/user.repository';
import { UsersSagas } from './sagas/users.sagas';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REDIS_SERVICE } from './users.constants';

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([{
      name: REDIS_SERVICE, transport: Transport.REDIS,
      options: { url: `redis://${REDIS_HOST}:${REDIS_PORT}` }
    }]),
  ],
  controllers: [UsersController],
  providers: [
    UserRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    UsersSagas,
  ],
})
export class UsersModule { }