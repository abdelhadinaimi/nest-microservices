package com.abdelhadinaimi.mediaservice.domain.event;

public class MediaCreatedEvent extends BaseEvent<String> {

    public final String title;
    public final String description;

    public MediaCreatedEvent(String id, String title, String description) {
        super(id);
        this.title = title;
        this.description = description;
    }
}
