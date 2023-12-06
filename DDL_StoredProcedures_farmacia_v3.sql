-- -----------------------------------------------------
-- Artifact:    DDL_StoredProcedures_farmacia_v3.sql
-- Version:     3.0
-- Date:        2023-05-02 12:50:00
-- Author:      Miguel Angel Gil Rios
-- Email:       mgil@utleon.edu.mx
--              angel.grios@gmail.com
-- Comments:    Se agregaron procedimientos almacenados
--              para insertar sucursales y empleados.
-- -----------------------------------------------------
USE sicefa;

select  * from empleado;

-- Procedimiento Almacenado para generar el codigo de un nuevo empleado.
DROP PROCEDURE IF EXISTS generarCodigoEmpleado;
DELIMITER $$
CREATE PROCEDURE generarCodigoEmpleado(OUT codigo VARCHAR(8))
	BEGIN
		DECLARE anio INT;
		DECLARE mes VARCHAR(2);
		DECLARE num VARCHAR(4);
		SET anio  = RIGHT(year(now()),2);
		SET mes   = LPAD(RIGHT(month(now()),2), 2, '0');
		SET num   = (SELECT LPAD(MAX(idUsuario) + 1, 4, '0') FROM usuario);
		SET codigo= CONCAT(anio,mes,num);
	END
$$
DELIMITER ;

-- Procedimiento almacenado para insertar un nuevo Empleado.
DROP PROCEDURE IF EXISTS insertarEmpleado;
DELIMITER $$
CREATE PROCEDURE insertarEmpleado(/* Datos Personales */
                                    IN	var_nombre          VARCHAR(64),    --  1
                                    IN	var_apellidoPaterno VARCHAR(64),    --  2
                                    IN	var_apellidoMaterno VARCHAR(64),    --  3
                                    IN  var_genero          VARCHAR(2),     --  4
                                    IN  var_fechaNacimiento VARCHAR(11),    --  5
                                    IN  var_rfc             VARCHAR(14),    --  6
                                    IN  var_curp            VARCHAR(19),    --  7
                                    IN	var_domicilio       VARCHAR(129),   --  8
                                    IN  var_cp              VARCHAR(11),    --  9
                                    IN  var_ciudad          VARCHAR(46),    -- 10
                                    IN  var_estado          VARCHAR(40),    -- 11
                                    IN	var_telefono        VARCHAR(20),    -- 12
                                    IN	var_foto            LONGTEXT,       -- 13
                                    
                                  /* Datos del la Sucursal */
                                    IN  var_idSucursal      INT,            -- 14
                                    
                                  /* Datos del Usuario    */
                                    IN  var_rol             VARCHAR(10),    -- 15
                                    
                                  /* Datos del Empleado */  
                                    IN  var_puesto          VARCHAR(25),    -- 16
                                    IN  var_salarioBruto    FLOAT,          -- 17
                                  
                                  /* Parametros de Salida */
                                    OUT var_idPersona       INT,            -- 18
                                    OUT var_idUsuario       INT,            -- 19
                                    OUT var_idEmpleado      INT,            -- 20
                                    OUT var_codigoEmpleado  VARCHAR(9)      -- 21
                                 )
    BEGIN
        -- Comenzamos insertando los datos de la Persona:
        INSERT INTO persona (nombre, apellidoPaterno, apellidoMaterno, genero,
                             fechaNacimiento, rfc, curp, domicilio, codigoPostal, 
                             ciudad, estado, telefono, foto)
                    VALUES( var_nombre, var_apellidoPaterno, var_apellidoMaterno, 
                            var_genero, STR_TO_DATE(var_fechaNacimiento, '%d/%m/%Y'),
                            var_rfc, var_curp, var_domicilio, var_cp,
                            var_ciudad, var_estado, var_telefono, var_foto);
        
        -- Obtenemos el ID de Persona que se genero:
        SET var_idPersona = LAST_INSERT_ID(); 
        
        -- Generamos el Codigo del Empleado porque lo necesitamos
        -- para generar el usuario:
        CALL generarCodigoEmpleado(var_codigoEmpleado);
        
        -- Insertamos los datos del Usuario que tendra el Empleado:
        INSERT INTO usuario (nombreUsuario, contrasenia, rol)
                    VALUES (var_codigoEmpleado, var_codigoEmpleado, var_rol);
        -- Recuperamos el ID de Usuario generado:
        SET var_idUsuario = LAST_INSERT_ID(); 
        
        -- Insertamos los datos del Empleado:
        INSERT INTO empleado(codigo, fechaIngreso, puesto, salarioBruto, activo,
                             idPersona, idUsuario, idSucursal)
                    VALUES(var_codigoEmpleado, NOW(), var_puesto, var_salarioBruto,
                           1, var_idPersona, var_idUsuario, var_idSucursal);
    END
$$
DELIMITER ;

-- Procedimiento almacenado para insertar una nueva sucursal.
--      Esta operacion implica que, al agregar una nueva sucursal,
--      de forma automatica se agregara un usuario administrador,
--      lo cual implica, la insercion de un empleado y una persona.
DROP PROCEDURE IF EXISTS insertarSucursal;
DELIMITER $$
CREATE PROCEDURE insertarSucursal(/* Datos Sucursal */
                                    IN	var_nombre          VARCHAR(49),    --  1
                                    IN	var_titular         VARCHAR(49),    --  2
                                    IN  var_rfc             VARCHAR(15),    --  3                                    
                                    IN	var_domicilio       VARCHAR(129),   --  4
                                    IN  var_colonia         VARCHAR(65),    --  5
                                    IN  var_codigoPostal    VARCHAR(11),    --  6
                                    IN  var_ciudad          VARCHAR(65),    --  7
                                    IN  var_estado          VARCHAR(49),    --  8                                    
                                    IN	var_telefono        VARCHAR(20),    --  9
                                    IN	var_latitud         VARCHAR(65),    -- 10
                                    IN	var_longitud        VARCHAR(65),    -- 11
                                    
                                  /* Parametros de Salida */
                                    OUT  var_idSucursal     INT,            -- 12
                                    OUT  var_idPersona      INT,            -- 13
                                    OUT  var_idUsuario      INT,            -- 14
                                    OUT  var_idEmpleado     INT,            -- 15
                                    OUT  var_codigoEmpleado VARCHAR( 9),    -- 16
                                    OUT  var_nombreUsuario  VARCHAR(33),    -- 17
                                    OUT  var_contrasenia    VARCHAR(33)     -- 18
                                 )
    BEGIN
        DECLARE idUsuarioMax INT;
    
        -- Comenzamos insertando los datos de la Sucursal:
        INSERT INTO sucursal(nombreS, titular, rfc, domicilio, colonia, codigoPostal,
                             ciudad, estado, telefono, latitud, longitud, estatus)
                    VALUES(var_nombre, var_titular, var_rfc, var_domicilio, var_colonia, var_codigoPostal,
                           var_ciudad, var_estado, var_telefono, var_latitud, var_longitud, 1);
        
        -- Recuperamos el ID de la Sucursal que se genero:
        SET var_idSucursal = LAST_INSERT_ID();
                
        -- Generamos el Codigo del Empleado porque lo necesitamos
        -- para generar el usuario:
        CALL generarCodigoEmpleado(var_codigoEmpleado);
        
        -- Generamos el nombre del Usuario Administrador que por default tendra la Sucursal:
        SET idUsuarioMax      = 1 + (SELECT MAX(idUsuario) FROM usuario);
        SET var_nombreUsuario = CONCAT('Admins', idUsuarioMax);
        SET var_contrasenia   = var_nombreUsuario;
        
        -- Insertamos los datos del Usuario que tendra el Empleado:
        INSERT INTO usuario (nombreUsuario, contrasenia, rol)
                    VALUES (var_nombreUsuario, var_contrasenia, 'ADMS');
        
        -- Recuperamos el ID de Usuario generado:
        SET var_idUsuario = LAST_INSERT_ID();
        
        -- Insertamos los datos personales:
        INSERT INTO persona (nombre, apellidoPaterno, apellidoMaterno, genero,
                             fechaNacimiento, rfc, curp, domicilio, codigoPostal, 
                             ciudad, estado, telefono, foto)
                    VALUES( CONCAT('Admins_', var_titular), '', '', 
                            'O', STR_TO_DATE('01/01/1901', '%d/%m/%Y'),
                            '', '', '', '',
                            '', '', '', '');
        
        -- Recuperamos el ID de la Persona que se genero:
        SET var_idPersona = LAST_INSERT_ID();
        
        -- Insertamos los datos del Empleado:
        INSERT INTO empleado(codigo, fechaIngreso, puesto, salarioBruto, activo,
                             idPersona, idUsuario, idSucursal)
                    VALUES(var_codigoEmpleado, NOW(), 'Gerente', 0.0,
                           1, var_idPersona, var_idUsuario, var_idSucursal);
    END
$$
DELIMITER ;


DROP PROCEDURE IF EXISTS estatusEmpleado;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `estatusEmpleado`(
in v_codigoEmpleado int
)
BEGIN
update empleado
set activo = 0 where codigo = v_codigoEmpleado;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS actualizarEmpleado;
DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE actualizarEmpleado(
    IN var_codigoEmpleado VARCHAR(10), -- 1
    IN var_nuevoPuesto VARCHAR(45), -- 2
    IN var_nuevoSalarioBruto FLOAT, -- 3
    IN var_nuevoNombre VARCHAR(45), -- 4
    IN var_nuevoApellidoPaterno VARCHAR(45), -- 5
    IN var_nuevoApellidoMaterno VARCHAR(45), -- 6
    IN var_nuevoGenero VARCHAR(2), -- 7
    IN var_nuevaFechaNacimiento varchar(11), -- 8
    IN var_nuevoRFC VARCHAR(15), -- 9
    IN var_nuevoCURP VARCHAR(19), -- 10
    IN var_nuevoDomicilio VARCHAR(129), -- 11
    IN var_nuevoCodigoPostal VARCHAR(11), -- 12
    IN var_nuevaCiudad VARCHAR(46), -- 13
    IN var_nuevoEstado VARCHAR(40), -- 14
    IN var_nuevoTelefono VARCHAR(20), -- 15
    IN var_nuevaSucursal INT, -- 16
    IN var_nuevoRol VARCHAR(10) -- 17
)
BEGIN
    START TRANSACTION;
    UPDATE persona
    SET
        nombre = var_nuevoNombre,
        apellidoPaterno = var_nuevoApellidoPaterno,
        apellidoMaterno = var_nuevoApellidoMaterno,
        genero = var_nuevoGenero,
        fechaNacimiento = STR_TO_DATE(var_nuevaFechaNacimiento, '%d/%m/%Y'),
        rfc = var_nuevoRFC,
        curp = var_nuevoCURP,
        domicilio = var_nuevoDomicilio,
        codigoPostal = var_nuevoCodigoPostal,
        ciudad = var_nuevaCiudad,
        estado = var_nuevoEstado,
        telefono = var_nuevoTelefono
    WHERE idPersona = (SELECT idPersona FROM empleado WHERE codigo = var_codigoEmpleado);

    UPDATE empleado
    SET
        puesto = var_nuevoPuesto,
        salarioBruto = var_nuevoSalarioBruto,
        idSucursal = var_nuevaSucursal,
        activo = 1
    WHERE  codigo = var_codigoEmpleado;
    
    UPDATE usuario
    SET 
		rol = var_nuevoRol
	WHERE idUsuario = (SELECT idUsuario FROM empleado where codigo = var_codigoEmpleado);

    COMMIT;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS modificarProducto;
DELIMITER $$
-- //////////////////////////////////////////////////////////////////
CREATE DEFINER=`root`@`localhost` PROCEDURE `modificarProducto`(
in var_idProducto int, -- 1
in var_nombre varchar(200),-- 2
in var_nombreGenerico varchar(250),-- 3
in var_formafarmaceutica varchar(100),-- 4
in var_unidadMedica varchar(250),-- 5
in var_presentacion varchar (50),-- 6
in var_principalIndicacion varchar(200),-- 7
in var_contraindicaciones varchar (200),-- 8
in var_concentracion varchar (250),-- 9
in var_unidadesEnvase int,-- 10
in var_preciocompra float,-- 11
in var_precioVenta float,-- 12
-- in var_foto longtext,-- 13
-- in var_rutaFoto varchar (200),-- 14
in var_codigoBarras varchar (65) -- 15
-- in var_estatus  int-- 16
)
BEGIN
Update producto
set nombre = var_nombre,
nombreGenerico = var_nombreGenerico,
formaFarmaceutica = var_formafarmaceutica,
unidadMedida = var_unidadMedica,
presentacion = var_presentacion,
principalIndicacion = var_principalIndicacion,
contraindicaciones = var_contraindicaciones,
concentracion = var_concentracion,
unidadesEnvase = var_unidadesEnvase,
precioCompra = var_preciocompra,
precioVenta = var_precioVenta,
-- foto = var_foto,
-- rutaFoto = var_rutaFoto,
codigoBarras = var_codigoBarras,
estatus = 1
where idProducto = var_idProducto;
END$$
-- /////////////////////////////////////////////////////////////////////
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertarSucursal`(/* Datos Sucursal */
                                    IN	var_nombre          VARCHAR(49),    --  1
                                    IN	var_titular         VARCHAR(49),    --  2
                                    IN  var_rfc             VARCHAR(15),    --  3                                    
                                    IN	var_domicilio       VARCHAR(129),   --  4
                                    IN  var_colonia         VARCHAR(65),    --  5
                                    IN  var_codigoPostal    VARCHAR(11),    --  6
                                    IN  var_ciudad          VARCHAR(65),    --  7
                                    IN  var_estado          VARCHAR(49),    --  8                                    
                                    IN	var_telefono        VARCHAR(20),    --  9
                                    IN	var_latitud         VARCHAR(65),    -- 10
                                    IN	var_longitud        VARCHAR(65),    -- 11
                                    in var_genero varchar(1),
                                    
                                  /* Parametros de Salida */
                                    OUT  var_idSucursal     INT,            -- 12
                                    OUT  var_idPersona      INT,            -- 13
                                    OUT  var_idUsuario      INT,            -- 14
                                    OUT  var_idEmpleado     INT,            -- 15
                                    OUT  var_codigoEmpleado VARCHAR( 9),    -- 17
                                    OUT  var_nombreUsuario  VARCHAR(33),    -- 17
                                    OUT  var_contrasenia    VARCHAR(33)     -- 18
                                 )
BEGIN
        DECLARE idUsuarioMax INT;
    
        -- Comenzamos insertando los datos de la Sucursal:
        INSERT INTO sucursal(nombre, titular, rfc, domicilio, colonia, codigoPostal,
                             ciudad, estado, telefono, latitud, longitud, estatus)
                    VALUES(var_nombre, var_titular, var_rfc, var_domicilio, var_colonia, var_codigoPostal,
                           var_ciudad, var_estado, var_telefono, var_latitud, var_longitud, 1);
        
        -- Recuperamos el ID de la Sucursal que se genero:
        SET var_idSucursal = LAST_INSERT_ID();
                
        -- Generamos el Codigo del Empleado porque lo necesitamos
        -- para generar el usuario:
        CALL generarCodigoEmpleado(var_codigoEmpleado);
        
        -- Generamos el nombre del Usuario Administrador que por default tendra la Sucursal:
        SET idUsuarioMax      = 1 + (SELECT MAX(idUsuario) FROM usuario);
        SET var_nombreUsuario = CONCAT('Admins', idUsuarioMax);
        SET var_contrasenia   = var_nombreUsuario;
        
        -- Insertamos los datos del Usuario que tendra el Empleado:
        INSERT INTO usuario (nombreUsuario, contrasenia, rol)
                    VALUES (var_nombreUsuario, var_contrasenia, 'ADMS');
        
        -- Recuperamos el ID de Usuario generado:
        SET var_idUsuario = LAST_INSERT_ID();
        
        -- Insertamos los datos personales:
        INSERT INTO persona (nombre, apellidoPaterno, apellidoMaterno, genero,
                             fechaNacimiento, rfc, curp, domicilio, codigoPostal, 
                             ciudad, estado, telefono, foto)
                    VALUES( CONCAT('Admins_', var_titular), '', '', 
                            var_genero, STR_TO_DATE('01/01/1901', '%d/%m/%Y'),
                            '', '', '', '',
                            '', '', '', '');
        
        -- Recuperamos el ID de la Persona que se genero:
        SET var_idPersona = LAST_INSERT_ID();
        
        -- Insertamos los datos del Empleado:
        INSERT INTO empleado(codigo, fechaIngreso, puesto, salarioBruto, activo,
                             idPersona, idUsuario, idSucursal)
                    VALUES(var_codigoEmpleado, NOW(), "admin", 30000,
                           1, var_idPersona, var_idUsuario, var_idSucursal);
    END$$
-- ///////////////////////////////////////////////////////////////////////////////////////////
DROP PROCEDURE IF EXISTS insertarProducto;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertarProducto`(
in var_nombre varchar(200), -- 1 
in var_nombreGenerico varchar(250), -- 2
in var_formafarmaceutica varchar(100), -- 3
in var_unidadMedica varchar(250), -- 4
in var_presentacion varchar (200), -- 5
in var_principalIndicacion varchar(200), -- 6
in var_contraindicaciones varchar (200), -- 7
in var_concentracion varchar (250),-- 8
in var_unidadesEnvase int,-- 9
in var_preciocompra float,-- 10
in var_precioVenta float,-- 11
in var_foto longtext,-- 12
in var_rutaFoto varchar (200),-- 13
in var_codigoBarras varchar (65)-- 14
)
BEGIN
insert into producto(nombre, nombreGenerico, formafarmaceutica, unidadMedida , presentacion, principalIndicacion, contraindicaciones, concentracion, unidadesEnvase,precioCompra, precioVenta, foto, rutaFoto, codigoBarras, estatus) 
values(var_nombre, var_nombreGenerico, var_formafarmaceutica, var_unidadMedica, var_presentacion, var_principalIndicacion, 
var_contraindicaciones, var_concentracion, var_unidadesEnvase, var_preciocompra, var_precioVenta, var_foto, var_rutaFoto, var_codigoBarras, 1);

insert into inventario(idProducto, idSucursal) values(last_insert_id(), 1);
END$$
-- //////////////////////////////////////////////////////////////////////////////////////////////
CREATE DEFINER=`root`@`localhost` PROCEDURE `elimnarProdcuto`(
in v_idProducto int
)
BEGIN
update producto
set estatus = 0 where idProducto = v_idProducto;
END$$
-- //////////////////////////////////////////////////////////////////////////////////////////////
CREATE DEFINER=`root`@`localhost` PROCEDURE `ActualizarProducto`(
in var_idProducto int,
in var_nombre varchar(200),
in var_nombreGenerico varchar(250),
in var_formafarmaceutica varchar(100),
in var_unidadMedica varchar(250),
in var_presentacion varchar (50),
in var_principalIndicacion varchar(200),
in var_contraindicaciones varchar (200),
in var_concentracion varchar (250),
in var_unidadesEnvase int,
in var_preciocompra float,
in var_precioVenta float,
in var_foto longtext,
in var_rutaFoto varchar (200),
in var_codigoBarras varchar (65),
in var_estatus  int
)
BEGIN
Update producto
set nombre = var_nombre,
nombreGenerico = var_nombreGenerico,
formaFarmaceutica = var_formafarmaceutica,
unidadMedida = var_unidadMedica,
presentacion = var_presentacion,
principalIndicacion = var_principalIndicacion,
contraindicaciones = var_contraindicaciones,
concentracion = var_concentracion,
unidadesEnvase = var_unidadesEnvase,
precioCompra = var_preciocompra,
precioVenta = var_precioVenta,
foto = var_foto,
rutaFoto = var_rutaFoto,
codigoBarras = var_codigoBarras,
estatus = var_estatus
where idProducto = var_idProducto;
END$$
-- //////////////////////////////////////////////////////////////////////////
DROP PROCEDURE IF EXISTS ActualizarSucursal$$
CREATE DEFINER=root@localhost PROCEDURE ActualizarSucursal(
in var_idSucursal int,
in var_nombre varchar(50),
in var_titular varchar(50),
in var_rfc varchar(15),
in var_domicilio varchar(129),
in var_colonia varchar(65),
in var_codigoPostal varchar(11),
in var_ciudad varchar(65),
in var_estado varchar (49),
in var_telefono varchar (20),
in var_latitud varchar (65),
in var_longitud varchar (65)
)
BEGIN
update sucursal
set 
nombreS = var_nombre,
titular = var_titular,
rfc = var_rfc,
domicilio = var_domicilio,
colonia = var_colonia,
codigoPostal = var_codigoPostal,
ciudad = var_ciudad,
estado = var_estado,
telefono = var_telefono,
latitud = var_latitud,
longitud = var_longitud,
estatus = 1
where idSucursal = var_idSucursal;
END$$

CREATE PROCEDURE EliminiarSucursal(
in v_idSucursal int
)
BEGIN
update sucursal
set estatus = 0 where idSucursal = v_idSucursal;
END$$

CREATE DEFINER=root@localhost PROCEDURE estatusCliente(
in v_idCliente int 
)
BEGIN
update cliente
set estatus = 0 where idCliente = v_idCliente;
END$$

DROP PROCEDURE insertarCliente$$
CREATE DEFINER=root@localhost PROCEDURE insertarCliente(
in var_nombre varchar(200),
in var_apellidoPaterno varchar(200),
in var_apellidoMaterno varchar(200),
in var_genero varchar (50),
in var_fechaNacimiento varchar(200),
in var_rfc varchar(15),
in var_curp varchar(19),
in var_domicilio varchar(129),
in var_codigoPostal varchar(11),
in var_ciudad varchar (46),
in var_estado varchar(40),
in var_telefono varchar(20),
in var_foto longtext,
in var_email varchar(45)
)
BEGIN
insert into persona(nombre, apellidoPaterno, apellidoMaterno, genero, fechaNacimiento, rfc, curp, domicilio, codigoPostal, ciudad, estado, telefono, foto) values (
var_nombre,
var_apellidoPaterno,
var_apellidoMaterno,
var_genero,
var_fechaNacimiento,
var_rfc,
var_curp,
var_domicilio,
var_codigoPostal,
var_ciudad,
var_estado,
var_telefono,
var_foto);

insert into cliente(email, fechaRegistro, estatus, idPersona)values (var_email, current_date(), 1, last_insert_id());
END$$

DROP PROCEDURE updateCliente$$
CREATE DEFINER=root@localhost PROCEDURE updateCliente(
    IN var_idCliente INT,
    IN var_nuevoEmail VARCHAR(45),
    IN var_nuevoNombre VARCHAR(45),
    IN var_nuevoApellidoPaterno VARCHAR(45),
    IN var_nuevoApellidoMaterno VARCHAR(45),
    IN var_nuevoGenero VARCHAR(2),
    IN var_nuevaFechaNacimiento DATE,
    IN var_nuevoRFC VARCHAR(15),
    IN var_nuevoCURP VARCHAR(19),
    IN var_nuevoDomicilio VARCHAR(129),
    IN var_nuevoCodigoPostal VARCHAR(11),
    IN var_nuevaCiudad VARCHAR(46),
    IN var_nuevoEstado VARCHAR(40),
    IN var_nuevoTelefono VARCHAR(20)
)
BEGIN
    START TRANSACTION;

    UPDATE persona
    SET
        nombre = var_nuevoNombre,
        apellidoPaterno = var_nuevoApellidoPaterno,
        apellidoMaterno = var_nuevoApellidoMaterno,
        genero = var_nuevoGenero,
        fechaNacimiento = var_nuevaFechaNacimiento,
        rfc = var_nuevoRFC,
        curp = var_nuevoCURP,
        domicilio = var_nuevoDomicilio,
        codigoPostal = var_nuevoCodigoPostal,
        ciudad = var_nuevaCiudad,
        estado = var_nuevoEstado,
        telefono = var_nuevoTelefono
    WHERE idPersona = (SELECT idPersona FROM cliente WHERE idCliente = var_idCliente);

    UPDATE cliente
    SET
        email = var_nuevoEmail,
        estatus = 1
    WHERE idCliente = var_idCliente;

    COMMIT;
END$$