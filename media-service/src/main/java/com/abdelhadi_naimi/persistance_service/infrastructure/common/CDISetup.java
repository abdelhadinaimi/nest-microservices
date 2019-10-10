package com.abdelhadi_naimi.persistance_service.infrastructure.common;

import org.axonframework.commandhandling.CommandBus;
import org.axonframework.commandhandling.SimpleCommandBus;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.axonframework.common.jpa.EntityManagerProvider;
import org.axonframework.config.Configuration;
import org.axonframework.eventsourcing.eventstore.EventStorageEngine;
import org.axonframework.eventsourcing.eventstore.jpa.JpaEventStorageEngine;
import org.axonframework.queryhandling.QueryBus;
import org.axonframework.queryhandling.QueryGateway;
import org.axonframework.queryhandling.SimpleQueryBus;
import org.axonframework.serialization.Serializer;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;

@ApplicationScoped
public class CDISetup {


    @Produces
    EventStorageEngine produceEventStorageEngine(Serializer serializer, EntityManagerProvider provider) {
        return new JpaEventStorageEngine.Builder().build(); // TODO change to Kafka
    }

    @Produces
    @ApplicationScoped
    CommandBus producesCommandBus() {
        return SimpleCommandBus.builder().build();
    }

    @Produces
    @ApplicationScoped
    QueryBus producesQueryBus() {
        return SimpleQueryBus.builder().build();
    }

    @Produces
    @ApplicationScoped
    CommandGateway produceCommandGateway(Configuration configuration) {
        return configuration.commandGateway();
    }

    @Produces
    @ApplicationScoped
    QueryGateway produceQueryGateway(Configuration configuration) {
        return configuration.queryGateway();
    }
}
