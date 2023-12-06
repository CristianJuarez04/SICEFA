package org.utl.dsm.controller;

import com.mysql.cj.jdbc.CallableStatement;
import java.sql.Connection;
import org.utl.dsm.bd.ConexionMysql;
import org.utl.dsm.modelo.Producto;
import java.sql.SQLException;
import java.util.ArrayList;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;

public class ControllerProducto {
    
    public String borrarP(int idProducto){
        String query ="{call elimnarProdcuto(?)}";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
            cstm.setInt(1, idProducto);
            
            cstm.execute();
            cstm.close();
            connMysql.close();
            conn.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
            
        }
        return"El producto se borro con exito";
    }

    public Producto actualizarP(Producto producto) throws SQLException {
        String query = "{CALL modificarProducto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
            cstm.setInt(1, producto.getIdProducto());
            cstm.setString(2, producto.getNombre());
            cstm.setString(3, producto.getNombreGenerico());
            cstm.setString(4, producto.getFormaFarmaceutica());
            cstm.setString(5, producto.getUnidadMedida());
            cstm.setString(6, producto.getPresentacion());
            cstm.setString(7, producto.getPrincipalIndicacion());
            cstm.setString(8, producto.getContraindicaciones());
            cstm.setString(9, producto.getConcentracion());
            cstm.setInt(10, producto.getUnidadesEnvase());
            cstm.setFloat(11, producto.getPrecioCompra());
            cstm.setFloat(12, producto.getPrecioVenta());
            //cstm.setString(13, producto.getFoto());
            //cstm.setString(14, producto.getRutaFoto());
            cstm.setString(13, producto.getCodigoBarras());
            //cstm.setInt(16, producto.getEstatus());

            cstm.execute();
            cstm.close();
            connMysql.close();
            conn.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
            
        }

        return producto;
    }

    public Producto insertProducto(Producto datosProducto) {
        String query = "{CALL insertarProducto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            CallableStatement cstm = (CallableStatement) conn.prepareCall(query);
            //Datos Producto

            cstm.setString(1, datosProducto.getNombre());
            cstm.setString(2, datosProducto.getNombreGenerico());
            cstm.setString(3, datosProducto.getFormaFarmaceutica());
            cstm.setString(4, datosProducto.getUnidadMedida());
            cstm.setString(5, datosProducto.getPresentacion());
            cstm.setString(6, datosProducto.getPrincipalIndicacion());
            cstm.setString(7, datosProducto.getContraindicaciones());
            cstm.setString(8, datosProducto.getConcentracion());
            cstm.setInt(9, datosProducto.getUnidadesEnvase());
            cstm.setFloat(10, datosProducto.getPrecioCompra());
            cstm.setFloat(11, datosProducto.getPrecioVenta());
            cstm.setString(12, datosProducto.getFoto());
            cstm.setString(13, datosProducto.getRutaFoto());
            cstm.setString(14, datosProducto.getCodigoBarras());
            //cstm.setInt(15, datosProducto.getEstatus());

            cstm.execute();
            cstm.close();
            connMysql.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return datosProducto;
    }

    
    public List<Producto> getAllProductos() throws SQLException {
        List<Producto> lP = new ArrayList<>();

        String query = "SELECT * FROM Producto";
        try {
            ConexionMysql connMysql = new ConexionMysql();
            Connection conn = connMysql.open();
            PreparedStatement pstm = conn.prepareStatement(query);
            ResultSet rs = pstm.executeQuery();

            while (rs.next()) {
                Producto prod = new Producto();
                //lo que está entre comillas debe de ser igual a como está en la base de datos
                prod.setIdProducto(rs.getInt("idProducto"));
                prod.setNombre(rs.getString("nombre"));
                prod.setNombreGenerico(rs.getString("nombreGenerico"));
                prod.setFormaFarmaceutica(rs.getString("formaFarmaceutica"));
                prod.setUnidadMedida(rs.getString("unidadMedida"));
                prod.setPresentacion(rs.getString("presentacion"));
                prod.setPrincipalIndicacion(rs.getString("principalIndicacion"));
                prod.setContraindicaciones(rs.getString("contraindicaciones"));
                prod.setConcentracion(rs.getString("concentracion"));
                prod.setUnidadesEnvase(rs.getInt("unidadesEnvase"));
                prod.setPrecioVenta(rs.getFloat("precioVenta"));
                prod.setPrecioCompra(rs.getFloat("precioCompra"));
                prod.setFoto(rs.getString("foto"));
                prod.setEstatus(rs.getInt("estatus"));
                prod.setCodigoBarras(rs.getString("codigoBarras"));
                lP.add(prod);
            }

            rs.close();
            pstm.close();
            connMysql.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return lP;
    }
}