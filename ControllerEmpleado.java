package org.utl.dsm.controller;

import java.sql.Connection;
import org.utl.dsm.bd.ConexionMysql;
import org.utl.dsm.modelo.Empleado;
import com.mysql.cj.jdbc.CallableStatement;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.List;
import java.sql.ResultSet;
import org.utl.dsm.modelo.Persona;
import java.sql.SQLException;
import org.utl.dsm.modelo.Sucursal;
import org.utl.dsm.modelo.Usuario;

public class ControllerEmpleado {

    List<Empleado> lE;
    
    public Empleado insertEmpleado(Empleado empleado) {
        String query = "{CALL insertarEmpleado(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
            //Datos Persona
            cstm.setString(1, empleado.getPersona().getNombre());
            cstm.setString(2, empleado.getPersona().getApellidoPaterno());
            cstm.setString(3, empleado.getPersona().getApellidoMaterno());
            cstm.setString(4, empleado.getPersona().getGenero());
            cstm.setString(5, empleado.getPersona().getFechaNacimiento());
            cstm.setString(6, empleado.getPersona().getRfc());
            cstm.setString(7, empleado.getPersona().getCurp());
            cstm.setString(8, empleado.getPersona().getDomicilio());
            cstm.setString(9, empleado.getPersona().getCodigoPostal());
            cstm.setString(10, empleado.getPersona().getCiudad());
            cstm.setString(11, empleado.getPersona().getEstado());
            cstm.setString(12, empleado.getPersona().getTelefono());
            cstm.setString(13, empleado.getPersona().getFoto());
            //Datos Sucursal
            cstm.setInt(14, empleado.getSucursal().getIdSucursal());
            //Datos Usuario
            cstm.setString(15, empleado.getrolUsuario().getRol());
            //Datos Empleado
            cstm.setString(16, empleado.getPuesto());
            cstm.setFloat(17, empleado.getSalarioBruto());
            //Ejecutar el procedimiento
            cstm.execute();
            //Cerrar los recursos
            cstm.close();
            connMysql.close();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return empleado;
    }

    public List<Empleado> getAllEmpleados() {
        lE = new ArrayList<>();

        String query = "SELECT * FROM vista_Empleados";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            ResultSet rs = pstm.executeQuery();

            while (rs.next()) {
                Empleado emp = new Empleado();
                Persona persona = new Persona();
                Usuario u = new Usuario();
                Sucursal suc = new Sucursal();
                //lo que está entre comillas debe de ser igual a como está en la base de datos
                persona.setIdPersona(rs.getInt("idPersona"));
                persona.setNombre(rs.getString("nombre"));
                persona.setApellidoPaterno(rs.getString("apellidopaterno"));
                persona.setApellidoMaterno(rs.getString("apellidomaterno"));
                persona.setGenero(rs.getString("genero"));
                persona.setFechaNacimiento(rs.getString("fechaNacimiento"));
                persona.setRfc(rs.getString("rfc"));
                persona.setCurp(rs.getString("curp"));
                persona.setDomicilio(rs.getString("domicilio"));
                persona.setCodigoPostal(rs.getString("codigoPostal"));
                persona.setCiudad(rs.getString("ciudad"));
                persona.setEstado(rs.getString("estado"));
                persona.setTelefono(rs.getString("telefono"));
                persona.setFoto(rs.getString("foto"));
                emp.setPersona(persona);
                emp.setCodigo(rs.getString("codigo"));
                suc.setNombre(rs.getString("nombreS"));
                suc.setIdSucursal(rs.getInt("idSucursal"));
                emp.setSucursal(suc);
                emp.setPuesto(rs.getString("puesto"));
                emp.setActivo(rs.getInt("activo"));
                emp.setSalarioBruto(rs.getFloat("salarioBruto"));
                u.setIdUsuario(rs.getInt("idUsuario"));
                u.setRol(rs.getString("rol"));
                emp.setIdUsuario(u);
                lE.add(emp);
            }

            rs.close();
            pstm.close();
            connMysql.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return lE;
    }

    public Empleado eliminarEmpleado(Empleado empleado) {
        String query = "{CALL estatusEmpleado(?)}";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
            //Datos Persona
            cstm.setString(1, empleado.getCodigo());
            
            //Ejecutar el procedimiento
            cstm.execute();
            //Cerrar los recursos
            cstm.close();
            connMysql.close();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return empleado;
    }
    
    public Empleado actualizarEmpleado(Empleado actualizarEmpleado)
    {
        String query = "{CALL actualizarEmpleado(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
            
            //Datos Empleado
            cstm.setString(1, actualizarEmpleado.getCodigo());
            cstm.setString(2, actualizarEmpleado.getPuesto());
            cstm.setFloat(3, actualizarEmpleado.getSalarioBruto());
            //Datos Persona
            cstm.setString(4, actualizarEmpleado.getPersona().getNombre());
            cstm.setString(5, actualizarEmpleado.getPersona().getApellidoPaterno());
            cstm.setString(6, actualizarEmpleado.getPersona().getApellidoMaterno());
            cstm.setString(7, actualizarEmpleado.getPersona().getGenero());
            cstm.setString(8, actualizarEmpleado.getPersona().getFechaNacimiento());
            cstm.setString(9, actualizarEmpleado.getPersona().getRfc());
            cstm.setString(10, actualizarEmpleado.getPersona().getCurp());
            cstm.setString(11, actualizarEmpleado.getPersona().getDomicilio());
            cstm.setString(12, actualizarEmpleado.getPersona().getCodigoPostal());
            cstm.setString(13, actualizarEmpleado.getPersona().getCiudad());
            cstm.setString(14, actualizarEmpleado.getPersona().getEstado());
            cstm.setString(15, actualizarEmpleado.getPersona().getTelefono());
            //Datos Sucursal
            cstm.setInt(16, actualizarEmpleado.getSucursal().getIdSucursal());
            //Datos Usuario
            cstm.setString(17, actualizarEmpleado.getrolUsuario().getRol());
            
            //Ejecutar el procedimiento
            cstm.execute();
            cstm.close();
            connMysql.close();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return actualizarEmpleado;
    }
}
