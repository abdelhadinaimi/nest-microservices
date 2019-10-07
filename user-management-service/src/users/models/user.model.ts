import { AggregateRoot } from "@nestjs/cqrs";
import { UserCreatedEvent } from "../events/impl/user-created.event";
import { UserDto } from "../interfaces/user.dto";



export class User extends AggregateRoot {

  constructor(userId: string, userDto: UserDto) {
    super();
  }

  createUser(userDto: UserDto) {
    this.apply(new UserCreatedEvent(userDto));
  }
  
}