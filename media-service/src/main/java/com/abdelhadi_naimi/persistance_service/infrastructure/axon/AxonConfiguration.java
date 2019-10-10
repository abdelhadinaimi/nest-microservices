package com.abdelhadi_naimi.persistance_service.infrastructure.axon;

import com.abdelhadi_naimi.persistance_service.domain.model.Media;
import org.axonframework.config.Configuration;
import org.axonframework.config.DefaultConfigurer;
import org.axonframework.eventsourcing.eventstore.EventStorageEngine;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;

@ApplicationScoped
public class AxonConfiguration {

    @Inject
    private EventStorageEngine eventStorageEngine;

    @Produces
    @ApplicationScoped
    Configuration produceConfiguration() {
        return DefaultConfigurer.defaultConfiguration()
                .configureEmbeddedEventStore(config -> eventStorageEngine)
                .configureAggregate(Media.class)
                .buildConfiguration();
    }

}
