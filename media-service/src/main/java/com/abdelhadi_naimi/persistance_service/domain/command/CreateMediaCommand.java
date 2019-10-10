package com.abdelhadi_naimi.persistance_service.domain.command;

import org.axonframework.modelling.command.TargetAggregateIdentifier;

public class CreateMediaCommand {

    @TargetAggregateIdentifier
    private final String mediaId;

    private final String title;

    private final String description;

    public CreateMediaCommand(String mediaId, String title, String description) {
        this.mediaId = mediaId;
        this.title = title;
        this.description = description;
    }

    public String getMediaId() {
        return mediaId;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}
