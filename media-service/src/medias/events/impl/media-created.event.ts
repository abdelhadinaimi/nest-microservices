import { IEvent } from "@nestjs/cqrs";
import { MediaDto } from "src/medias/interfaces/media.dto";


export class MediaCreatedEvent implements IEvent {
  constructor(
    public readonly mediaDto: MediaDto) {}
}