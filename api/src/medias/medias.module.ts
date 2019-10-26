import { Module, CacheModule } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { REDIS } from '../app.constants';
import { MediasController } from './medias.controller';
import { MediasService } from './medias.service';
import { ConfigService } from '../config/config.service';

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
export class MediasModule { }
