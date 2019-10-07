package com.abdelhadi_naimi.persistance_service;

import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;
import java.util.logging.Logger;

public class LoggerProducer {
    @Produces
    public Logger exposeLogger(InjectionPoint injectionPoint) {
        System.out.println("HELOOOOOOOOOOO");
        return Logger.getLogger(injectionPoint.getMember().getDeclaringClass().getName());
    }

}
