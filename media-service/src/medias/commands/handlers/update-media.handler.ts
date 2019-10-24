import { ICommandHandler, EventPublisher, CommandHandler } from "@nestjs/cqrs";
import { UpdateMediaCommand } from "../impl/update-media.command";
import { MediaRepository } from "../../repository/media.repository";
import { Logger } from "@nestjs/common";
import { Media } from "src/medias/models/media.model";

@CommandHandler(UpdateMediaCommand)
export class UpdateMediaHandler implements ICommandHandler<UpdateMediaCommand>{

  constructor(
    private readonly repository: MediaRepository,
    private readonly publisher: EventPublisher,
  ) { }

  async execute(command: UpdateMediaCommand) {
    Logger.log('Async updateMediaHandler...', 'updateMediaCommand');
    const { updateMediaDto } = command;
    const media: Media = this.publisher.mergeObjectContext(
      await this.repository.updateMedia(updateMediaDto)
    );
    media.updateMedia(updateMediaDto);
    media.commit();
    return { success: true, _id:media.id };
  }
}