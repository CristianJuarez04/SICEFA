package org.utl.dsm.controller;

import java.sql.Connection;
import org.utl.dsm.bd.ConexionMysql;
import org.utl.dsm.modelo.Fosforo;
import com.mysql.cj.jdbc.CallableStatement;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.List;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ControllerEjemplo 
{
    public void save(Fosforo fosforo) throws SQLException{
        String query = "{CALL sp_insert_fosforo(?,?)}";
        ConexionMysql connMysql = new ConexionMysql();
        Connection conn = connMysql.open();
        CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
        cstm.setString(1, fosforo.getPersonita().getNombre());
        cstm.setString(2, fosforo.getNoCuenta());
        // ejecutamos el PreparedStatement
        cstm.execute();
        //Cerramos todos nuestros objetos de conexión con el servidor
        cstm.close();
        connMysql.close();
        conn.close();
    }
}