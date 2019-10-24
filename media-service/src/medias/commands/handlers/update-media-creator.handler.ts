import { ICommandHandler, EventPublisher, CommandHandler } from "@nestjs/cqrs";
import { UpdateMediaCreatorCommand } from "../impl/update-media-creator.command";
import { MediaRepository } from "../../repository/media.repository";
import { Logger } from "@nestjs/common";
import { Media } from "src/medias/models/media.model";

@CommandHandler(UpdateMediaCreatorCommand)
export class UpdateMediaCreatorHandler implements ICommandHandler<UpdateMediaCreatorCommand>{

  constructor(
    private readonly repository: MediaRepository,
    private readonly publisher: EventPublisher,
  ) { }

  async execute(command: UpdateMediaCreatorCommand) {
    Logger.log('Async updateMediaHandler...', 'updateMediaCommand');
    const { updateMediaCreatorDto } = command;
    const media: Media = this.publisher.mergeObjectContext(
      await this.repository.updateMediaCreator(updateMediaCreatorDto)
    );
    media.updateMediaCreator(updateMediaCreatorDto);
    media.commit();
    return { success: true, _id:media.id };
  }
}