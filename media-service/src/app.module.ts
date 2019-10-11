import { Module } from '@nestjs/common';
import { MediasModule } from './medias/medias.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [MediasModule, ConfigModule]
})
export class AppModule { }
