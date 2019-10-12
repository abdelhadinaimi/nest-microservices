import { IEvent } from "@nestjs/cqrs";
import { Media } from "src/medias/models/media.model";


export class MediaCreatedEvent implements IEvent {
  constructor(
    public readonly media: Media) {}
}