use sicefa;

drop view if exists vista_Empleados;
create view vista_Empleados as
select  p.*, e.codigo, s.nombreS, s.idSucursal, e.puesto, e.activo, u.idUsuario, u.rol, e.salarioBruto
	from Empleado as e
	inner join Persona as p on e.idPersona = p.idPersona
    inner join Usuario as u on u.idUsuario = e.idUsuario
    inner join Sucursal as s on e.idsucursal = s.idSucursal;
    
select * from persona;
select *  from empleado;
select * from producto;
select * from cliente;

drop view if exists verProductos;
create view verProductos as
select nombreGenerico, formaFarmaceutica, unidadMedida, presentacion, principalIndicacion, contraindicaciones, concentracion,
 unidadesEnvase, precioVenta, foto, estatus, codigoBarras from producto;

describe producto;
select * from producto;
select *  from sucursal;

select * from verProductos;
select * from cliente;
drop view if exists vista_Clientes;
create view vista_Clientes as
select c.idCliente, p.*, c.estatus, c.email 
	from Persona as p 
	inner join Cliente as c on p.idPersona = c.idPersona;

select * from sucursal;
select *  from vista_Empleados;

create view verSucursales as
select idSucursal, nombreS, titular, domicilio, telefono, estatus from sucursal;

DROP VIEW IF EXISTS editableEmpleado;
-- create view editableEmpleado as 
select p.*, e.codigo, e.puesto, e.salarioBruto, s.nombreS, u.rol from  empleado as e 
inner join persona as p on e.idPersona = p.idPersona
inner join sucursal as s on s.idSucursal = e.idSucursal
inner join usuario as u on u.idUsuario = e.idUsuario;