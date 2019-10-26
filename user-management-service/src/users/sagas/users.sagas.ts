import { Injectable, Logger, Inject } from "@nestjs/common";
import { Saga, ICommand, ofType } from "@nestjs/cqrs";
import { Observable } from "rxjs";
import { delay, map } from 'rxjs/operators';
import { UserCreatedEvent } from "../events/impl/user-created.event";
import { REDIS } from "../../app.constants";
import { ClientProxy } from "@nestjs/microservices";
import { UserUpdatedEvent } from "../events/impl/user-updated.event";

@Injectable()
export class UsersSagas {
  constructor(@Inject(REDIS.PROXY_NAME) private readonly client: ClientProxy) { }

  @Saga()
  userCreated = (event$: Observable<any>): Observable<ICommand> => {
    return event$
      .pipe(
        ofType(UserCreatedEvent),
        delay(1000),
        map(event => {
          Logger.log('Inside [UsersSagas] Saga', 'UsersSagas');
          this.client.emit('user_created', event.createUserDto); // publishes an event to rabbitMQ
          return null;
        }),
      )
  }

  @Saga()
  userUpdated = (event$: Observable<any>): Observable<ICommand> => {
    return event$
      .pipe(
        ofType(UserUpdatedEvent),
        delay(1000),
        map(event => {
          Logger.log('user_updated', 'UsersSagas');
          this.client.emit('user_created', event.updateUserDto); // publishes an event to rabbitMQ
          if (event.updateUserDto.username) {
            this.client.emit('user_updated_creator_info', { creator: event.updateUserDto });
          }
          return null;
        }),
      )
  }
}