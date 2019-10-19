import { ICommand } from "@nestjs/cqrs";
import { UpdateUserDto } from "src/users/dto/update-user.dto";

export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly updateUserDto: UpdateUserDto,
  ) { }
}
