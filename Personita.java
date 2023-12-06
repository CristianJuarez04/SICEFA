package org.utl.dsm.modelo;

public class Personita 
{
    private int idPersonita;
    private String nombre;

    public Personita() {
    }

    public Personita(int idPersonita, String nombre) {
        this.idPersonita = idPersonita;
        this.nombre = nombre;
    }

    public int getIdPersonita() {
        return idPersonita;
    }

    public void setIdPersonita(int idPersonita) {
        this.idPersonita = idPersonita;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}