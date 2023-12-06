package org.utl.dsm.modelo;

public class Empleado 
{
    private int idEmpleado;
    private String codigo;
    private String fechaIngreso;
    private String puesto;
    private float salarioBruto;
    private int activo;
    private Persona persona;
    private Usuario rolUsuario;
    private Sucursal sucursal;

    public Empleado() {
    }

    public Empleado(String puesto, float salarioBruto, Usuario rolUsuario, Sucursal sucursal) {
        this.puesto = puesto;
        this.salarioBruto = salarioBruto;
        this.rolUsuario = rolUsuario;
        this.sucursal = sucursal;
    }

    public int getIdEmpleado() {
        return idEmpleado;
    }

    public void setIdEmpleado(int idEmpleado) {
        this.idEmpleado = idEmpleado;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(String fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public String getPuesto() {
        return puesto;
    }

    public void setPuesto(String puesto) {
        this.puesto = puesto;
    }

    public float getSalarioBruto() {
        return salarioBruto;
    }

    public void setSalarioBruto(float salarioBruto) {
        this.salarioBruto = salarioBruto;
    }

    public int getActivo() {
        return activo;
    }

    public void setActivo(int activo) {
        this.activo = activo;
    }

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public Usuario getrolUsuario() {
        return rolUsuario;
    }

    public void setIdUsuario(Usuario idUsuario) {
        this.rolUsuario = idUsuario;
    }

    public Sucursal getSucursal() {
        return sucursal;
    }

    public void setSucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
    }
}