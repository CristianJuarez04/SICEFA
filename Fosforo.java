package org.utl.dsm.modelo;

public class Fosforo 
{
    private int idFosforo;
    private String noCuenta;
    private Personita personita;

    public Fosforo() {
    }

    public Fosforo(int idFosforo, String noCuenta, Personita personita) {
        this.idFosforo = idFosforo;
        this.noCuenta = noCuenta;
    }

    public Personita getPersonita() {
        return personita;
    }

    public void setPersonita(Personita personita) {
        this.personita = personita;
    }

    
    
    public int getIdFosforo() {
        return idFosforo;
    }

    public void setIdFosforo(int idFosforo) {
        this.idFosforo = idFosforo;
    }

    public String getNoCuenta() {
        return noCuenta;
    }

    public void setNoCuenta(String noCuenta) {
        this.noCuenta = noCuenta;
    }
}