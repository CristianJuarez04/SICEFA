package org.utl.dsm.controller;

import org.utl.dsm.modelo.Sucursal;
import com.mysql.cj.jdbc.CallableStatement;
import java.sql.Connection;
import java.util.List;
import java.sql.SQLException;
import java.util.ArrayList;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import org.utl.dsm.bd.ConexionMysql;

public class ControllerSucursal {

    public Sucursal insertSucursal(Sucursal sucursal) {
        String query = "{CALL insertarSucursal(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
            //Datos Sucursal
            //cstm.setInt(1, sucursal.getIdSucursal());
            cstm.setString(1, sucursal.getNombre());
            cstm.setString(2, sucursal.getTitular());
            cstm.setString(3, sucursal.getRfc());
            cstm.setString(4, sucursal.getDomicilio());
            cstm.setString(5, sucursal.getColonia());
            cstm.setString(6, sucursal.getCodigoPostal());
            cstm.setString(7, sucursal.getCiudad());
            cstm.setString(8, sucursal.getEstado());
            cstm.setString(9, sucursal.getTelefono());
            cstm.setString(10, sucursal.getLatitud());
            cstm.setString(11, sucursal.getLongitud());
            //cstm.setInt(13, sucursal.getEstatus());
            //Registrar los parámetros de salida
            cstm.registerOutParameter(12, java.sql.Types.INTEGER); // var_Sucursal
            cstm.registerOutParameter(13, java.sql.Types.INTEGER); // var_idPersonaa
            cstm.registerOutParameter(14, java.sql.Types.INTEGER); // var_idUsuario
            cstm.registerOutParameter(15, java.sql.Types.INTEGER); // var_idEmpleado:
            cstm.registerOutParameter(16, java.sql.Types.INTEGER); // var_codigoEmpleado            
            cstm.registerOutParameter(17, java.sql.Types.INTEGER); // var_nombreUsuario
            cstm.registerOutParameter(18, java.sql.Types.INTEGER); // var_Contrasenia
            cstm.execute();
            cstm.close();
            connMysql.close();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return sucursal;
    }

    public List<Sucursal> getAllSucursales() {
        List<Sucursal> lS = new ArrayList<>();

        String query = "SELECT * FROM sucursal";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            ResultSet rs = pstm.executeQuery();

            while (rs.next()) {
                Sucursal suc = new Sucursal();
                //lo que está entre comillas debe de ser igual a como está en la base de datos
                suc.setIdSucursal(rs.getInt("idSucursal"));
                suc.setNombre(rs.getString("nombreS"));
                suc.setTitular(rs.getString("titular"));
                suc.setRfc(rs.getString("rfc"));
                suc.setDomicilio(rs.getString("domicilio"));
                suc.setColonia(rs.getString("colonia"));
                suc.setCodigoPostal(rs.getString("codigoPostal"));
                suc.setCiudad(rs.getString("ciudad"));
                suc.setEstado(rs.getString("estado"));
                suc.setTelefono(rs.getString("telefono"));
                suc.setLatitud(rs.getString("latitud"));
                suc.setLongitud(rs.getString("longitud"));
                suc.setEstatus(rs.getInt("estatus"));

                lS.add(suc);
            }

            rs.close();
            pstm.close();
            connMysql.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return lS;
    }

    public Sucursal actualizarSucursal(Sucursal datosSucursal) throws SQLException {
        String query = "{CALL ActualizarSucursal(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            CallableStatement cstm = (CallableStatement) conn.prepareCall(query);

            // Datos Sucursal
            cstm.setInt(1, datosSucursal.getIdSucursal());
            cstm.setString(2, datosSucursal.getNombre());
            cstm.setString(3, datosSucursal.getTitular());
            cstm.setString(4, datosSucursal.getRfc());
            cstm.setString(5, datosSucursal.getDomicilio());
            cstm.setString(6, datosSucursal.getColonia());
            cstm.setString(7, datosSucursal.getCodigoPostal());
            cstm.setString(8, datosSucursal.getCiudad());
            cstm.setString(9, datosSucursal.getEstado());
            cstm.setString(10, datosSucursal.getTelefono());
            cstm.setString(11, datosSucursal.getLatitud());
            cstm.setString(12, datosSucursal.getLongitud());

            cstm.execute();
            cstm.close();
            connMysql.close();
            conn.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }

        return datosSucursal;
    }

    public String borrar(int idSucursal) {
        String query = "{call EliminiarSucursal(?)}";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
            cstm.setInt(1, idSucursal);

            cstm.execute();
            cstm.close();
            connMysql.close();
            conn.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
            return "Error al borrar la sucursal";
        }
        return "La sucursal se borró con éxito";
    }
}