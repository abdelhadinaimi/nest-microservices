import { AggregateRoot } from "@nestjs/cqrs";
import { UserCreatedEvent } from "../events/impl/user-created.event";
import { UserDto } from "../interfaces/user.dto";



export class User extends AggregateRoot {
  [x: string]: any;

  constructor(userId: string) {
    super();
  }

  setData(data) {
    this.data = data;
  }

  createUser() {
    this.apply(new UserCreatedEvent(this.data));
  } 
  
}