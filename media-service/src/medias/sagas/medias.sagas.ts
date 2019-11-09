import { Injectable, Logger, Inject } from "@nestjs/common";
import { Saga, ICommand, ofType } from "@nestjs/cqrs";
import { Observable } from "rxjs";
import { delay, map } from 'rxjs/operators';
import { MediaCreatedEvent } from "../events/impl/media-created.event";
import { ClientProxy } from "@nestjs/microservices";
import { MediaUpdatedEvent } from "../events/impl/media-updated.event";
import { REDIS } from "../../app.constants";

@Injectable()
export class MediasSagas {
  constructor(@Inject(REDIS.PROXY_NAME) private readonly client: ClientProxy) { }

  @Saga()
  mediaCreated = (event$: Observable<any>): Observable<ICommand> => {
    return event$
      .pipe(
        ofType(MediaCreatedEvent),
        delay(1000),
        map(event => {
          Logger.log(event.createMediaDto, 'MediasSagas');
          this.client.emit('media_created', event.createMediaDto); // publishes an event to rabbitMQ
          return null;
        }),
      )
  };

  @Saga()
  mediaUpdated = (event$: Observable<any>): Observable<ICommand> => {
    return event$
      .pipe(
        ofType(MediaUpdatedEvent),
        delay(200),
        map(event => {
          Logger.log("media updated", 'MediasSagas');
          this.client.emit('media_updated', event.updateMediaDto); // publishes an event to rabbitMQ
          return null;
        }),
      )
  };
}