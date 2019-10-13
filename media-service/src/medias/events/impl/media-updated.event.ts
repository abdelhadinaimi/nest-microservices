import { IEvent } from "@nestjs/cqrs";
import { Media } from "src/medias/models/media.model";
import { UpdateMediaDto } from "src/medias/dto/update-media.dto";


export class MediaUpdatedEvent implements IEvent {
  constructor(public readonly mediaId: string, public readonly updateMediaDto: UpdateMediaDto) {}
}