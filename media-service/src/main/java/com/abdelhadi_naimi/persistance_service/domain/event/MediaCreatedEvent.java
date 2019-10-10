package com.abdelhadi_naimi.persistance_service.domain.event;


import org.axonframework.modelling.command.TargetAggregateIdentifier;

public class MediaCreatedEvent {

    public String getMediaId() {
        return mediaId;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    @TargetAggregateIdentifier
    private final String mediaId;

    private final String title;

    private final String description;

    public MediaCreatedEvent(String mediaId, String title, String description) {
        this.mediaId = mediaId;
        this.title = title;
        this.description = description;
    }
}
