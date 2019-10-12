import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AMQ_PROXY } from '../app.constants';
import { MediasController } from './medias.controller';
import { MediasService } from './medias.service';
import { ConfigService } from '../config/config.service';

@Module({
  controllers: [MediasController],
  providers: [
    MediasService,
    {
      provide: AMQ_PROXY,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.getRabitMQOptions('medias_queue'));
      },
      inject: [ConfigService],
    },
  ],
})
export class MediasModule { }
