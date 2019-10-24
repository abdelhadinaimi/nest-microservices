import { AggregateRoot } from "@nestjs/cqrs";
import { MediaCreatedEvent } from "../events/impl/media-created.event";
import { MediaUpdatedEvent } from "../events/impl/media-updated.event";
import { UpdateMediaDto } from "../dto/update-media.dto";
import { CreateMediaDto } from "../dto/create-media.dto";


export class Media extends AggregateRoot {
  constructor(public readonly id: string) {
    super();
  }

  createMedia(createMediaDto: CreateMediaDto) {
    this.apply(new MediaCreatedEvent(this.id, createMediaDto));
  }

  updateMedia(updateMediaDto: UpdateMediaDto) {
    this.apply(new MediaUpdatedEvent(this.id, updateMediaDto));
  }
}