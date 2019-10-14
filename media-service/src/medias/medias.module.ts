import { Module, CacheModule } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { MediasController } from './medias.controller';
import { QueryHandlers } from './queries/handlers';
import { MediaRepository } from './repository/media.repository';
import { MediasSagas } from './sagas/medias.sagas';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AMQ_PROXY } from '../app.constants';
import { ConfigService } from '../config/config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaSchema } from './schemas/media.schema';
import { MediasService } from './medias.service';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'Media', schema: MediaSchema }]),
    CacheModule.register(),
  ],
  controllers: [MediasController],
  providers: [
    {
      provide: AMQ_PROXY,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.getRabitMQOptions());
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