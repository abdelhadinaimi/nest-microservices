package com.abdelhadi_naimi.persistance_service;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("rest")
public class Rest {

    @GET
    public String get(){
        return "hello";
    }
}
