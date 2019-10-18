import { Injectable, Logger, Inject } from "@nestjs/common";
import { Saga, ICommand, ofType } from "@nestjs/cqrs";
import { Observable } from "rxjs";
import { delay, map } from 'rxjs/operators';
import { UserCreatedEvent } from "../events/impl/user-created.event";
import { AMQ_PROXY } from "../../app.constants";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class UsersSagas {
  constructor(@Inject(AMQ_PROXY) private readonly client: ClientProxy) { }
  
  @Saga()
  userCreated = (event$: Observable<any>): Observable<ICommand> => {
    return event$
      .pipe(
        ofType(UserCreatedEvent),
        delay(1000),
        map(event => {
          Logger.log('Inside [UsersSagas] Saga', 'UsersSagas');
          this.client.emit('user_created',event.createUserDto); // publishes an event to rabbitMQ
          return null;
        }),
      )
  }

}