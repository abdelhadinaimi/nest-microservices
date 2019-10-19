import { AggregateRoot } from "@nestjs/cqrs";
import { UserCreatedEvent } from "../events/impl/user-created.event";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserUpdatedEvent } from "../events/impl/user-updated.event";


export class User extends AggregateRoot {

  constructor(private readonly id: string) {
    super();
  }

  createUser(createUserDto: CreateUserDto) {
    this.apply(new UserCreatedEvent(createUserDto));
  }

  updateUser(updateUserDto: UpdateUserDto){
    this.apply(new UserUpdatedEvent(updateUserDto));
  }

}