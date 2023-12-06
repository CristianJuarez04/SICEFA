package org.utl.dsm.modelo;

public class Sucursal 
{
    int idSucursal;
    String nombreS, titular, rfc, domicilio, colonia, codigoPostal, ciudad, estado, telefono, latitud, longitud;
    int estatus;

    public Sucursal() {
    }

    public Sucursal(String nombreS, String titular, String rfc, String domicilio, String colonia, String codigoPostal, String ciudad, String estado, String telefono, String latitud, String longitud, int estatus) {
        this.nombreS = nombreS;
        this.titular = titular;
        this.rfc = rfc;
        this.domicilio = domicilio;
        this.colonia = colonia;
        this.codigoPostal = codigoPostal;
        this.ciudad = ciudad;
        this.estado = estado;
        this.telefono = telefono;
        this.latitud = latitud;
        this.longitud = longitud;
        this.estatus = estatus;
    }

    public int getIdSucursal() {
        return idSucursal;
    }

    public void setIdSucursal(int idSucursal) {
        this.idSucursal = idSucursal;
    }

    public String getNombre() {
        return nombreS;
    }

    public void setNombre(String nombreS) {
        this.nombreS = nombreS;
    }

    public String getTitular() {
        return titular;
    }

    public void setTitular(String titular) {
        this.titular = titular;
    }

    public String getRfc() {
        return rfc;
    }

    public void setRfc(String rfc) {
        this.rfc = rfc;
    }

    public String getDomicilio() {
        return domicilio;
    }

    public void setDomicilio(String domicilio) {
        this.domicilio = domicilio;
    }

    public String getColonia() {
        return colonia;
    }

    public void setColonia(String colonia) {
        this.colonia = colonia;
    }

    public String getCodigoPostal() {
        return codigoPostal;
    }

    public void setCodigoPostal(String codigoPostal) {
        this.codigoPostal = codigoPostal;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getLatitud() {
        return latitud;
    }

    public void setLatitud(String latitud) {
        this.latitud = latitud;
    }

    public String getLongitud() {
        return longitud;
    }

    public void setLongitud(String longitud) {
        this.longitud = longitud;
    }

    public int getEstatus() {
        return estatus;
    }

    public void setEstatus(int estatus) {
        this.estatus = estatus;
    }

    @Override
    public String toString() {
        return "Sucursal{" + "idSucursal=" + idSucursal + ", nombreS=" + nombreS + ", titular=" + titular + ", rfc=" + rfc + ", domicilio=" + domicilio + ", colonia=" + colonia + ", codigoPostal=" + codigoPostal + ", ciudad=" + ciudad + ", estado=" + estado + ", telefono=" + telefono + ", latitud=" + latitud + ", longitud=" + longitud + ", estatus=" + estatus + '}';
    }
}