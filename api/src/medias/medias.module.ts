import { Module, CacheModule, MiddlewareConsumer } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { REDIS } from '../app.constants';
import { MediasController } from './medias.controller';
import { MediasService } from './medias.service';
import { ConfigService } from '../config/config.service';
import { AuthenticationMiddleware } from '../common/authentication.middleware';
import { ROUTES } from './medias.constants';

@Module({
  imports: [CacheModule.register()],
  controllers: [MediasController],
  providers: [
    MediasService,
    {
      provide: REDIS.PROXY_NAME,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.getRedisOptions());
      },
      inject: [ConfigService],
    },
  ],
})
export class MediasModule { 
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        ...ROUTES.filter(r => r.protected)
      )
  }
 }
