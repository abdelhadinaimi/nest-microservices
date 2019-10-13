import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { MediaUpdatedEvent } from "../impl/media-updated.event";



@EventsHandler(MediaUpdatedEvent)
export class MediaUpdatedHandler implements IEventHandler<MediaUpdatedEvent> {
  
  handle(event: MediaUpdatedEvent) {
    Logger.log("In Event", 'MediaUpdatedEvent');
  }

}