import { IEvent } from "@nestjs/cqrs";
import { UpdateUserDto } from "src/users/dto/update-user.dto";


export class UserUpdatedEvent implements IEvent {
  constructor(
    public readonly updateUserDto: UpdateUserDto) {}
}