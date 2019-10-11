package com.abdelhadinaimi.mediaservice.domain.model;

import com.abdelhadinaimi.mediaservice.domain.command.CreateMediaCommand;
import com.abdelhadinaimi.mediaservice.domain.event.MediaCreatedEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;

@Aggregate
public class MediaAggregate {

    @AggregateIdentifier
    private String mediaId;

    private String title;

    private String description;

    public MediaAggregate() { }

    @CommandHandler
    public  MediaAggregate(CreateMediaCommand command){
        AggregateLifecycle.apply(new MediaCreatedEvent(command.id,command.title,command.description));
    }

    @EventSourcingHandler
    protected void on(MediaCreatedEvent event){
        this.mediaId = event.id;
        this.title = event.title;
        this.description = event.description;
    }
}
