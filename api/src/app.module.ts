import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { AuthenticationMiddleware } from './common/authentication.middleware';
import { UsersModule } from './users/users.module';
import { MediasModule } from './medias/medias.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    MediasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { path: '/admin', method: RequestMethod.ALL },
      )
  }
}
