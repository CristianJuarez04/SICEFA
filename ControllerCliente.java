package org.utl.dsm.controller;
    
import com.mysql.cj.jdbc.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.utl.dsm.bd.ConexionMysql;
import org.utl.dsm.modelo.Cliente;
import org.utl.dsm.modelo.Persona;

public class ControllerCliente {
    
    public Cliente insertCliente(Cliente cliente) {
        String query = "{CALL insertarCliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
            //Datos Persona
            cstm.setString(1, cliente.getPersona().getNombre());
            cstm.setString(2, cliente.getPersona().getApellidoPaterno());
            cstm.setString(3, cliente.getPersona().getApellidoMaterno());
            cstm.setString(4, cliente.getPersona().getGenero());
            cstm.setString(5, cliente.getPersona().getFechaNacimiento());
            cstm.setString(6, cliente.getPersona().getRfc());
            cstm.setString(7, cliente.getPersona().getCurp());
            cstm.setString(8, cliente.getPersona().getDomicilio());
            cstm.setString(9, cliente.getPersona().getCodigoPostal());
            cstm.setString(10, cliente.getPersona().getCiudad());
            cstm.setString(11, cliente.getPersona().getEstado());
            cstm.setString(12, cliente.getPersona().getTelefono());
            cstm.setString(13, cliente.getPersona().getFoto());
            //Datos Cliente
            cstm.setString(14, cliente.getEmail());
            //cstm.setInt(15, cliente.getEstatus());
            cstm.execute();
            cstm.close();
            connMysql.close();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return cliente;
    }
    
    public List<Cliente> getAllClientes() {
        List<Cliente> lE = new ArrayList<>();

        String query = "SELECT * FROM vista_Clientes";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            ResultSet rs = pstm.executeQuery();

            while (rs.next()) {
                Cliente cli = new Cliente();
                Persona p = new Persona();
                //lo que está entre comillas debe de ser igual a como está en la base de datos
                cli.setIdCliente(rs.getInt("idCliente"));
                p.setNombre(rs.getString("nombre"));
                p.setApellidoPaterno(rs.getString("apellidopaterno"));
                p.setApellidoMaterno(rs.getString("apellidomaterno"));
                p.setTelefono(rs.getString("telefono"));
                p.setRfc(rs.getString("rfc"));
                cli.setEstatus(rs.getInt("estatus"));
                p.setCurp(rs.getString("curp"));
                p.setDomicilio(rs.getString("domicilio"));
                p.setCodigoPostal(rs.getString("codigoPostal"));
                p.setCiudad(rs.getString("ciudad"));
                p.setEstado(rs.getString("estado"));
                p.setFechaNacimiento(rs.getString("fechaNacimiento"));
                p.setGenero(rs.getString("genero"));
                cli.setEmail(rs.getString("email"));
                cli.setPersona(p);
                
                lE.add(cli);
            }

            rs.close();
            pstm.close();
            connMysql.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return lE;
    }
    
    public Cliente eliminarCliente(Cliente cliente) {
        String query = "{CALL estatusCliente(?)}";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
            //Datos Persona
            cstm.setInt(1, cliente.getIdCliente());
            cstm.execute();
            cstm.close();
            connMysql.close();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return cliente;
    }
    
    public Cliente updateCliente(Cliente datosCliente) {
        String query = "{CALL updateCliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
            //Datos Persona
            cstm.setInt(1, datosCliente.getIdCliente());
            cstm.setString(2, datosCliente.getEmail());
            //cstm.setInt(3, datosCliente.getEstatus());
            cstm.setString(3, datosCliente.getPersona().getNombre());
            cstm.setString(4, datosCliente.getPersona().getApellidoPaterno());
            cstm.setString(5, datosCliente.getPersona().getApellidoMaterno());
            cstm.setString(6, datosCliente.getPersona().getGenero());
            cstm.setString(7, datosCliente.getPersona().getFechaNacimiento());
            cstm.setString(8, datosCliente.getPersona().getRfc());
            cstm.setString(9, datosCliente.getPersona().getCurp());
            cstm.setString(10, datosCliente.getPersona().getDomicilio());
            cstm.setString(11, datosCliente.getPersona().getCodigoPostal());
            cstm.setString(12, datosCliente.getPersona().getCiudad());
            cstm.setString(13, datosCliente.getPersona().getEstado());
            cstm.setString(14, datosCliente.getPersona().getTelefono());
            //cstm.setString(16, cliente.getPersona().getFoto());
            
            cstm.execute();
            cstm.close();
            connMysql.close();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return datosCliente;
    }
}
