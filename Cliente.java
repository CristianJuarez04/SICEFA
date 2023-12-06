package org.utl.dsm.modelo;

import java.util.Date;

public class Cliente extends Persona{
    private int idCliente;
    private String email;
    private String fechaRegistro;
    private int estatus;
    private Persona persona; 

    public Cliente() {
    }

    public Cliente(int idCliente, String email, String fechaRegistro, int estatus, Persona persona) {
        this.idCliente = idCliente;
        this.email = email;
        this.fechaRegistro = fechaRegistro;
        this.estatus = estatus;
        this.persona = persona;
    }

    /*public Cliente(int idCliente, String email, String fechaRegistro, int estatus, Persona persona, String nombre, String apellidoPaterno, String apellidoMaterno, String genero, String fechaNacimiento, String rfc, String curp, String domicilio, String codigoPostal, String ciudad, String estado, String telefono, String foto) {
        super(nombre, apellidoPaterno, apellidoMaterno, genero, fechaNacimiento, rfc, curp, domicilio, codigoPostal, ciudad, estado, telefono, foto);
        this.idCliente = idCliente;
        this.email = email;
        this.fechaRegistro = fechaRegistro;
        this.estatus = estatus;
        this.persona = persona;
    }*/

    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(String fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public int getEstatus() {
        return estatus;
    }

    public void setEstatus(int estatus) {
        this.estatus = estatus;
    }

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public int getIdPersona() {
        return idPersona;
    }

    public void setIdPersona(int idPersona) {
        this.idPersona = idPersona;
    }

    
}