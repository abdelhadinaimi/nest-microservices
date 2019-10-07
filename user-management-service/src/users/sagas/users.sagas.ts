import { Injectable, Logger } from "@nestjs/common";
import { Saga, ICommand, ofType } from "@nestjs/cqrs";
import { Observable } from "rxjs";
import { delay, map } from 'rxjs/operators';
import { UserCreatedEvent } from "../events/impl/user-created.event";

@Injectable()
export class UsersSagas {

  // @Saga()
  // userCreated = (event$: Observable<any>): Observable<ICommand> => {
  //   return event$
  //     .pipe(
  //       ofType(UserCreatedEvent),
  //       delay(1000),
  //       map(event => {
  //         Logger.log('Inside [UsersSagas] Saga', 'UsersSagas');
  //         const userId = event.userDto[0].userId[0];
  //         return null;
  //       }),
  //     )
  // }

}