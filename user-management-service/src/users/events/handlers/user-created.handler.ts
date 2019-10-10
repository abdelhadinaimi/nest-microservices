import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserCreatedEvent } from "../impl/user-created.event";
import { Logger, Inject } from "@nestjs/common";
import { REDIS_SERVICE } from "../../users.constants";
import { ClientProxy } from "@nestjs/microservices";


@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {

  constructor(@Inject(REDIS_SERVICE) private readonly client: ClientProxy) { }

  handle(event: UserCreatedEvent) {
    this.client.emit('user_created',event.userDto); // publishes an event to redis
    Logger.log("In Event", 'UserCreatedEvent');
  }

}