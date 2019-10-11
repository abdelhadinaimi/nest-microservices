import { ICommandHandler, EventPublisher, CommandHandler } from "@nestjs/cqrs";
import { CreateMediaCommand } from "../impl/create-media.command";
import { MediaRepository } from "../../repository/media.repository";
import { Logger } from "@nestjs/common";

@CommandHandler(CreateMediaCommand)
export class CreateMediaHandler implements ICommandHandler<CreateMediaCommand>{

  constructor(
    private readonly repository: MediaRepository,
    private readonly publisher: EventPublisher,
  ) { }

  async execute(command: CreateMediaCommand) {
    Logger.log('Async CreateMediaHandler...', 'CreateMediaCommand');
    const { mediaDto } = command;
    const media = this.publisher.mergeObjectContext(
      await this.repository.createMedia(mediaDto),
    );
    media.createMedia();
    media.commit();
    return { success: true };
  }
}