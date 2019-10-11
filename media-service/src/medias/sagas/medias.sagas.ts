import { Injectable, Logger, Inject } from "@nestjs/common";
import { Saga, ICommand, ofType } from "@nestjs/cqrs";
import { Observable } from "rxjs";
import { delay, map } from 'rxjs/operators';
import { MediaCreatedEvent } from "../events/impl/media-created.event";
import { AMQ_PROXY } from "../../app.constants";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class MediasSagas {
  constructor(@Inject(AMQ_PROXY) private readonly client: ClientProxy) { }
  
  @Saga()
  mediaCreated = (event$: Observable<any>): Observable<ICommand> => {
    return event$
      .pipe(
        ofType(MediaCreatedEvent),
        delay(1000),
        map(event => {
          Logger.log('Inside [MediasSagas] Saga', 'MediasSagas');
          this.client.emit('media_created',event.mediaDto); // publishes an event to rabbitMQ
          return null;
        }),
      )
  }

}