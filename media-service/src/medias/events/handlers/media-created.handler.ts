import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { MediaCreatedEvent } from "../impl/media-created.event";
import { Logger } from "@nestjs/common";



@EventsHandler(MediaCreatedEvent)
export class MediaCreatedHandler implements IEventHandler<MediaCreatedEvent> {
  
  handle(event: MediaCreatedEvent) {
    Logger.log("In Event", 'MediaCreatedEvent');
  }

}