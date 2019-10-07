import { IEvent } from "@nestjs/cqrs";
import { UserDto } from "src/users/interfaces/user.dto";


export class UserCreatedEvent implements IEvent {
  constructor(
    public readonly userDto: UserDto) {}
}