import { IEvent } from "@nestjs/cqrs";
import { CreateUserDto } from "src/users/dto/create-user.dto";


export class UserCreatedEvent implements IEvent {
  constructor(
    public readonly createUserDto: CreateUserDto) {}
}