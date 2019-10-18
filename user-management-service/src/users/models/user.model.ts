import { AggregateRoot } from "@nestjs/cqrs";
import { UserCreatedEvent } from "../events/impl/user-created.event";
import { CreateUserDto } from "../dto/create-user.dto";


export class User extends AggregateRoot {

  constructor(private readonly id: string) {
    super();
  }

  createUser(createUserDto: CreateUserDto) {
    this.apply(new UserCreatedEvent(createUserDto));
  }

}