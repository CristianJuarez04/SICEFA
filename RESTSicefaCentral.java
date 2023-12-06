package org.utl.dsm.rest;

import com.google.gson.Gson;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.List;
import org.utl.dsm.controller.ControllerCliente;
import org.utl.dsm.controller.ControllerEmpleado;
import org.utl.dsm.controller.ControllerProducto;
import org.utl.dsm.controller.ControllerSucursal;
import org.utl.dsm.modelo.Cliente;
import org.utl.dsm.modelo.Empleado;
import org.utl.dsm.modelo.Producto;
import org.utl.dsm.modelo.Sucursal;

@Path("central")
public class RESTSicefaCentral extends Application {

    ////////////////////////////////  Empleados  //////////////////////
    @Path("insertarEmpleado")
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED) // Indicar el tipo de medio que acepta el método
    @Produces(MediaType.APPLICATION_JSON) // Indicar el tipo de medio que devuelve el método
    public Response insertEmpleado(@FormParam("datosEmpleado") @DefaultValue("{}") String datosEmpleado) { // Asignar un valor por defecto al parámetro
        System.out.println(datosEmpleado);
        Gson gson = new Gson();
        ControllerEmpleado ce = new ControllerEmpleado();
        Empleado e = gson.fromJson(datosEmpleado, Empleado.class);

        try {
            ce.insertEmpleado(e);
            return Response.ok("{\"result\":\"Empleado registrado correctamente\"}").build();
        } catch (Exception ex) {
            ex.printStackTrace();
            return Response.ok("{\"result\":\"Ha ocurrido un error al intentar registrar el empleado\"}").build();
        }
        //String out = gson.toJson(e);
        //return Response.status(Response.Status.CREATED).entity(out).build();
    }

    @Path("getAllEmpleados")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getAllEmpleados() {
        ControllerEmpleado ce = new ControllerEmpleado();
        List<Empleado> empleados = ce.getAllEmpleados();
        Gson gson = new Gson();
        String out = gson.toJson(empleados);
        return Response.ok(out).build();
    }

    @Path("eliminarEmpleado")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response getEmpleadoEditar(@FormParam("codigo") @DefaultValue("") String codigo) {
        Gson gson = new Gson();
        ControllerEmpleado ce = new ControllerEmpleado();
        Empleado e = gson.fromJson(codigo, Empleado.class);

        try {
            ce.eliminarEmpleado(e);
            return Response.ok("{\"result\":\"El empleado ha sido eliminado\"}").build();
        } catch (Exception ex) {
            ex.printStackTrace();
            return Response.ok("{\"result\":\"Ha ocurrido un error al intentar eliminar el empleado\"}").build();
        }

        //String out = g.toJson(ce);
        //return Response.ok(out).build();
    }

    @Path("actualizarEmpleado")
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED) // Indicar el tipo de medio que acepta el método
    @Produces(MediaType.APPLICATION_JSON) // Indicar el tipo de medio que devuelve el método
    public Response actualizarEmpleado(@FormParam("actualizarEmpleado") @DefaultValue("{}") String actualizarEmpleado) { // Asignar un valor por defecto al parámetro
        System.out.println(actualizarEmpleado);
        Gson gson = new Gson();
        ControllerEmpleado ce = new ControllerEmpleado();
        Empleado e = gson.fromJson(actualizarEmpleado, Empleado.class);

        try {
            ce.actualizarEmpleado(e);
            return Response.ok("{\"result\":\"Empleado actualizado correctamente\"}").build();
        } catch (Exception ex) {
            ex.printStackTrace();
            return Response.ok("{\"result\":\"Ha ocurrido un error al intentar actualizar el empleado\"}").build();
        }
        //String out = gson.toJson(e);
        //return Response.status(Response.Status.CREATED).entity(out).build();
    }

    ////////////////////////////////  Productos  //////////////////////
    @Path("getAllProductos")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getAllProductos() throws SQLException {
        ControllerProducto cp = new ControllerProducto();
        List<Producto> productos = cp.getAllProductos();
        Gson gson = new Gson();
        String out = gson.toJson(productos);
        return Response.ok(out).build();
    }

    @Path("insertarp")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response insertarProducto(@FormParam("datosProducto") @DefaultValue("{}") String datosProducto) {

        ControllerProducto cP = new ControllerProducto();
        Gson gson = new Gson();
        Producto np = gson.fromJson(datosProducto, Producto.class);


        // Implement error handling for database operation
        try {
            cP.insertProducto(np);
            return Response.ok("{\"result\":\"Producto registrado correctamente\"}").build();
        } catch (Exception ex) {
            ex.printStackTrace();
            return Response.ok("{\"result\":\"Ha ocurrido un error al intentar registrar el producto\"}").build();
        }
    }

    @Path("actualizar")
    @POST
    @Produces(MediaType.APPLICATION_JSON)

    public Response actualizarProducto(
            @FormParam("idProducto") @DefaultValue("0") int idProducto,
            @FormParam("p_nombre") @DefaultValue("") String pNombre,
            @FormParam("p_nombreGenerico") @DefaultValue("") String pNombreGenerico,
            @FormParam("formaFarmaceutica") @DefaultValue("") String formaFarmaceutica,
            @FormParam("unidadMedida") @DefaultValue("") String unidadMedida,
            @FormParam("principalIndicacion") @DefaultValue("") String principalIndicacion,
            @FormParam("presentacion") @DefaultValue("") String presentacion,
            @FormParam("contraindicaciones") @DefaultValue("") String contraindicaciones,
            @FormParam("concentracion") @DefaultValue("") String concentracion,
            @FormParam("unidadesEnvase") @DefaultValue("0") int unidadesEnvase,
            @FormParam("precioUnitario") @DefaultValue("0") float precioUnitario,
            @FormParam("precioCompra") @DefaultValue("0") float precioCompra,
            @FormParam("rutaFoto") @DefaultValue("") String rutaFoto,
            @FormParam("estatus") @DefaultValue("1") int estatus,
            @FormParam("codigoBarras") @DefaultValue("") String codigoBarras) throws SQLException {

        ControllerProducto cP = new ControllerProducto();
        Producto np = new Producto(idProducto,
                pNombre,
                pNombreGenerico,
                formaFarmaceutica,
                unidadMedida,
                presentacion,
                principalIndicacion,
                contraindicaciones,
                concentracion,
                unidadesEnvase,
                precioCompra,
                precioUnitario,
                "",
                rutaFoto,
                codigoBarras,
                estatus);

        // Implement error handling for database operation
        try {
            cP.actualizarP(np);
        } catch (SQLException e) {
            // Handle the exception and return an appropriate response
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error inserting product").build();
        }

        String out = """
             {"idProducto": "%d",
             "p_nombre": "%s"}
             """;
        out = String.format(out, idProducto, pNombre);
        return Response.status(Response.Status.CREATED).entity(out).build();
    }

    @Path("borrarp")
    @POST
    @Produces(MediaType.APPLICATION_JSON)

    public Response borrarProducto(@FormParam("idProducto") @DefaultValue("0") int IdProducto) {

        ControllerProducto cP = new ControllerProducto();
        cP.borrarP(IdProducto);

        String out = """
             {"idProducto": "%s",
             "response": "Se elimino con exito"}
             """;
        out = String.format(out, IdProducto);
        return Response.status(Response.Status.CREATED).entity(out).build();

    }

    ////////////////////////////////  Clientes  //////////////////////
    @Path("getAllC")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getAll() {
        ControllerCliente cc = new ControllerCliente();
        List<Cliente> clientes = cc.getAllClientes();
        Gson gson = new Gson();
        String out = gson.toJson(clientes);
        return Response.ok(out).build();
    }
    
    @Path("insertCliente")
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED) // Indicar el tipo de medio que acepta el método
    @Produces(MediaType.APPLICATION_JSON) // Indicar el tipo de medio que devuelve el método
    public Response insertCliente(@FormParam("datosCliente") @DefaultValue("{}") String datosCliente) { // Asignar un valor por defecto al parámetro
        System.out.println(datosCliente);
        Gson gson = new Gson();
        ControllerCliente cc = new ControllerCliente();
        Cliente c = gson.fromJson(datosCliente, Cliente.class);

        try {
            cc.insertCliente(c);
            return Response.ok("{\"result\":\"Cliente insertado correctamente\"}").build();
        } catch (Exception ex) {
            ex.printStackTrace();
            return Response.ok("{\"result\":\"Error del servidor\"}").build();
        }
        //String out = gson.toJson(e);
        //return Response.status(Response.Status.CREATED).entity(out).build();
    }
    
    @Path("eliminarCliente")
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED) // Indicar el tipo de medio que acepta el método
    @Produces(MediaType.APPLICATION_JSON) // Indicar el tipo de medio que devuelve el método
    public Response eliminarCliente(@FormParam("datosCliente") @DefaultValue("{}") String datosCliente) { // Asignar un valor por defecto al parámetro
        System.out.println(datosCliente);
        Gson gson = new Gson();
        ControllerCliente cc = new ControllerCliente();
        Cliente c = gson.fromJson(datosCliente, Cliente.class);

        try {
            cc.eliminarCliente(c);
            return Response.ok("{\"result\":\"Empleado eliminado correctamente\"}").build();
        } catch (Exception ex) {
            ex.printStackTrace();
            return Response.ok("{\"result\":\"Error del servidor\"}").build();
        }
        //String out = gson.toJson(e);
        //return Response.status(Response.Status.CREATED).entity(out).build();
    }
    
    @Path("updateCliente")
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED) // Indicar el tipo de medio que acepta el método
    @Produces(MediaType.APPLICATION_JSON) // Indicar el tipo de medio que devuelve el método
    public Response updateCliente(@FormParam("datosCliente") @DefaultValue("{}") String datosCliente) { // Asignar un valor por defecto al parámetro
        System.out.println(datosCliente);
        Gson gson = new Gson();
        ControllerCliente cc = new ControllerCliente();
        Cliente c = gson.fromJson(datosCliente, Cliente.class);

        try {
            cc.updateCliente(c);
            return Response.ok("{\"result\":\"Empleado actualizado correctamente\"}").build();
        } catch (Exception ex) {
            ex.printStackTrace();
            return Response.ok("{\"result\":\"Error del servidor\"}").build();
        }
        //String out = gson.toJson(e);
        //return Response.status(Response.Status.CREATED).entity(out).build();
    }

    ////////////////////////////////  Sucursales  //////////////////////
    @Path("getAllSucursales")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getAllSucursales() {
        ControllerSucursal cs = new ControllerSucursal();
        List<Sucursal> sucursales = cs.getAllSucursales();
        Gson gson = new Gson();
        String out = gson.toJson(sucursales);
        return Response.ok(out).build();
    }

    @Path("insertarSucursal")
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED) // Indicar el tipo de medio que acepta el método
    @Produces(MediaType.APPLICATION_JSON) // Indicar el tipo de medio que devuelve el método
    public Response insertSucursal(@FormParam("datosSucursal")
            @DefaultValue("{}") String datos
    ) { // Asignar un valor por defecto al parámetro
        System.out.println(datos);
        Gson gson = new Gson();
        ControllerSucursal cs = new ControllerSucursal();
        Sucursal e = gson.fromJson(datos, Sucursal.class);

        try {
            cs.insertSucursal(e);
            return Response.ok("{\"result\":\"Sucursal registrada correctamente\"}").build();
        } catch (Exception ex) {
            ex.printStackTrace();
            return Response.ok("{\"result\":\"Ha ocurrido un error al intentar registrar la sucursal\"}").build();
        }
        //String out = gson.toJson(e);
        //return Response.status(Response.Status.CREATED).entity(out).build();
    }
    
    @Path("actualizarSucursal")
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED) // Indicar el tipo de medio que acepta el método
    @Produces(MediaType.APPLICATION_JSON) // Indicar el tipo de medio que devuelve el método
    public Response actualizarSucursal(@FormParam("datosSucursal")
            @DefaultValue("{}") String datosSucursal
    ) { // Asignar un valor por defecto al parámetro
        System.out.println(datosSucursal);
        Gson gson = new Gson();
        ControllerSucursal cs = new ControllerSucursal();
        Sucursal e = gson.fromJson(datosSucursal, Sucursal.class);

        try {
            cs.actualizarSucursal(e);
            return Response.ok("{\"result\":\"Sucursal registrada correctamente\"}").build();
        } catch (Exception ex) {
            ex.printStackTrace();
            return Response.ok("{\"result\":\"Ha ocurrido un error al intentar registrar la sucursal\"}").build();
        }
        //String out = gson.toJson(e);
        //return Response.status(Response.Status.CREATED).entity(out).build();
    }
    
    @Path("borrarSucursal")
    @POST
    @Produces(MediaType.APPLICATION_JSON)

    public Response borrarSucursales(@FormParam("idSucursal") @DefaultValue("0") int id) {

        ControllerSucursal cP = new ControllerSucursal();
        cP.borrar(id);

        String out = """
             {"nombre": "%s",
             "response": "Se elimino con exito"}
             """;
        out = String.format(out, id);
        return Response.status(Response.Status.CREATED).entity(out).build();
    }
}
