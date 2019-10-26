import { Module, CacheModule } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { UsersController } from './users.controller';
import { QueryHandlers } from './queries/handlers';
import { UserRepository } from './repository/user.repository';
import { UsersSagas } from './sagas/users.sagas';
import { ClientProxyFactory } from '@nestjs/microservices';
import { REDIS } from '../app.constants';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '../config/config.service';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    CacheModule.register(),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: REDIS.PROXY_NAME,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.getRedisOptions());
      },
      inject: [ConfigService],
    },
    UsersService,
    UserRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    UsersSagas,
  ],
})
export class UsersModule { }