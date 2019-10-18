import { ICommandHandler, EventPublisher, CommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "../impl/create-user.command";
import { UserRepository } from "../../repository/user.repository";
import { Logger } from "@nestjs/common";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand>{

  constructor(
    private readonly repository: UserRepository,
    private readonly publisher: EventPublisher,
  ) { }

  async execute(command: CreateUserCommand) {
    Logger.log('Async CreateUserHandler...', 'CreateUserCommand');
    const { createUserDto } = command;
    const user = this.publisher.mergeObjectContext(
      await this.repository.createUser(createUserDto),
    );
    user.createUser(createUserDto);
    user.commit();
    return { success: true };
  }
}