import { Module, CacheModule } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { MediasController } from './medias.controller';
import { QueryHandlers } from './queries/handlers';
import { MediaRepository } from './repository/media.repository';
import { MediasSagas } from './sagas/medias.sagas';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '../config/config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaSchema } from './schemas/media.schema';
import { MediasService } from './medias.service';
import { REDIS } from '../app.constants';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'Media', schema: MediaSchema }]),
    CacheModule.register(),
  ],
  controllers: [MediasController],
  providers: [
    {
      provide: REDIS.PROXY_NAME,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.getRedisOptions());
      },
      inject: [ConfigService],
    },
    MediasService,
    MediaRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    MediasSagas,
  ],
})
export class MediasModule { }