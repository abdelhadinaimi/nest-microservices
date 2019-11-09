import { Module, MiddlewareConsumer, RequestMethod, Logger } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { REDIS } from '../app.constants';
import { ConfigService } from '../config/config.service';
import { AuthenticationMiddleware } from '../common/authentication.middleware';
import { ROUTES } from './users.constants';


@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: REDIS.PROXY_NAME,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.getRedisOptions());
      },
      inject: [ConfigService],
    },
  ],
})
export class UsersModule { 
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        ...ROUTES.filter(r => r.protected)
      )
  }
 }