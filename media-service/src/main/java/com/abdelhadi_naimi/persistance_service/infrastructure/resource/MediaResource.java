package com.abdelhadi_naimi.persistance_service.infrastructure.resource;

import com.abdelhadi_naimi.persistance_service.domain.command.CreateMediaCommand;
import com.abdelhadi_naimi.persistance_service.infrastructure.query.GetMediaQuery;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.axonframework.queryhandling.QueryGateway;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.util.UUID;

@Stateless
@Path("/user")
public class MediaResource {

    @Inject
    private CommandGateway commandGateway;

    @Inject
    private QueryGateway queryGateway;

    @POST
    @Path("/create")
    public Response createMedia(@Valid CreateMediaCommand command) {
        return commandGateway.send(command)
                .thenApply(r -> Response.accepted().build())
                .join();
    }

}
