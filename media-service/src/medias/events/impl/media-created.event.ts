import { IEvent } from "@nestjs/cqrs";
import { Media } from "src/medias/models/media.model";
import { CreateMediaDto } from "src/medias/dto/create-media.dto";


export class MediaCreatedEvent implements IEvent {
  constructor(public readonly mediaId: string, public readonly createMediaDto: CreateMediaDto) {}
}