import { AggregateRoot } from "@nestjs/cqrs";
import { MediaCreatedEvent } from "../events/impl/media-created.event";


export class Media extends AggregateRoot {
  [x: string]: any;

  constructor(mediaId: string) {
    super();
  }

  setData(data) {
    this.data = data;
  }

  createMedia() {
    this.apply(new MediaCreatedEvent(this.data));
  }

}