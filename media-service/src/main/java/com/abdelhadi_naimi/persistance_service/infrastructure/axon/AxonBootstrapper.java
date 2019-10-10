package com.abdelhadi_naimi.persistance_service.infrastructure.axon;

import org.axonframework.config.Configuration;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;


@Singleton
@Startup
public class AxonBootstrapper {
    private Boolean started;

    @Inject
    private Configuration configuration;

    @PostConstruct
    private void start(){
        configuration.start();
        started = true;
    }
    @PreDestroy
    private void shutdown() {
        if (started) {
            configuration.shutdown();
            started = false;
        }
    }
}
