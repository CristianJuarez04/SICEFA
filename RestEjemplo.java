package org.utl.dsm.rest;

import com.google.gson.Gson;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.utl.dsm.controller.ControllerEjemplo;
import org.utl.dsm.modelo.Fosforo;

@Path("ejemplo")
public class RestEjemplo extends Application
{
    @Path("insertEjemplo")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response insertEjemplo(@FormParam("datosEjemplo") @DefaultValue("") String datos){
        String out = "";
        Gson gson = null;
        ControllerEjemplo ce = new ControllerEjemplo();
        Fosforo f = null;
        
        try {
            gson = new Gson();
            f = gson.fromJson(datos, Fosforo.class);
            ce.save(f);
            out = """
                  {"response" : "Registro insertado"}
                  """;
        } catch (Exception ex) {
            out = """
                  {"response" : "Error al insertar"}
                  """;
            ex.getStackTrace();
        }
        
        return Response.ok(out).build();
    }
}