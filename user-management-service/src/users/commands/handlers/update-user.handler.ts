import { ICommandHandler, EventPublisher, CommandHandler } from "@nestjs/cqrs";
import { UserRepository } from "../../repository/user.repository";
import { Logger } from "@nestjs/common";
import { UpdateUserCommand } from "../impl/update-user.command";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand>{

  constructor(
    private readonly repository: UserRepository,
    private readonly publisher: EventPublisher,
  ) { }

  async execute(command: UpdateUserCommand) {
    Logger.log('Async UpdateUserHandler...', 'UpdateUserCommand');
    const { updateUserDto } = command;
    const user = this.publisher.mergeObjectContext(
      await this.repository.updateUser(updateUserDto),
    );
    user.updateUser(updateUserDto);
    user.commit();
    return { success: true };
  }
}