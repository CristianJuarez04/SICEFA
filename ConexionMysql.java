package org.utl.dsm.bd;

import java.sql.DriverManager;
import java.sql.Connection;

public class ConexionMysql {
    Connection conn;
    
    public Connection open(){
        String user = "root";
        String password = "admin";
        String url = "jdbc:mysql://127.0.0.1:3307/sicefa";
        String parametros = "?useSSL=false&useUnicode=true&characterEncoding=utf-8";
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(url+parametros, user, password);
            return conn;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    
    public void close(){
        if (conn != null) {
            try {
                conn.close();
            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException();
            }
        }
}
}
