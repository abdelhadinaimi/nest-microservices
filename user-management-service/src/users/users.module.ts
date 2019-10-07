import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { UsersController } from './users.controller';
import { QueryHandlers } from './queries/handlers';
import { UserRepository } from './repository/user.repository';
import { UsersSagas } from './sagas/users.sagas';


@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [
    UserRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    UsersSagas,
  ],
})
export class UsersModule {}