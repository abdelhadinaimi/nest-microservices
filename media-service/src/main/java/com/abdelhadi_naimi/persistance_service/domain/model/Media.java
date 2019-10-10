package com.abdelhadi_naimi.persistance_service.domain.model;

import com.abdelhadi_naimi.persistance_service.domain.command.CreateMediaCommand;
import com.abdelhadi_naimi.persistance_service.domain.event.MediaCreatedEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.common.Assert;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.modelling.command.AggregateRoot;

@AggregateRoot
public class Media {

    @AggregateIdentifier
    private String mediaId;

    private String title;

    private String description;

    protected Media() {
        // For Axon instantiation
    }

    @CommandHandler
    public Media(CreateMediaCommand command){
        Assert.notNull(command.getMediaId(), () -> "ID should not be null");
        Assert.notNull(command.getDescription(), () -> "Description should not be null");
        Assert.notNull(command.getTitle(), () -> "Title should not be null");

        AggregateLifecycle.apply(new MediaCreatedEvent(command.getMediaId(),command.getTitle(),command.getDescription()));
    }

    @EventSourcingHandler
    public void on(MediaCreatedEvent event){
        this.mediaId = event.getMediaId();
        this.title = event.getTitle();
        this.description = event.getDescription();
    }
}
