import { ICommand } from "@nestjs/cqrs";
import { UserDto } from "../../interfaces/user.dto";

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly userDto: UserDto,
  ) { }
}