getAllEmpleados();
cargarSucursales();

function seleccionarFila() {
    var tabla = document.getElementById("tblEmpleados");
    tabla.addEventListener("click", function (event) {
        let nombre = document.getElementById("txtNombre");
        nombre.focus();
        //nombre.window.scrollTo(0, document.querySelector("#txtNombre").offsetTop);

        var elemento = event.target;
        if (elemento.tagName === "TD") {
            var fila = elemento.parentNode;
            fila.classList.toggle("seleccionada");

            // Obtener las celdas de la fila
            var celdas = fila.getElementsByTagName("td");

            // Llenar los campos de entrada con la información de la fila
            var codigo = celdas[0].textContent;


            document.getElementById("txtCodigo").value = celdas[0].textContent;
            document.getElementById("txtNombre").value = celdas[1].textContent;

            let apellidos = celdas[2].textContent.split(" ");

            document.getElementById("txtApellidoPaterno").value = apellidos[0];
            document.getElementById("txtApellidoMaterno").value = apellidos[1];
            document.getElementById("txtGenero").value = celdas[6].textContent;
            document.getElementById("dateBirth").value = celdas[3].textContent;
            document.getElementById("txtRFC").value = celdas[5].textContent;
            document.getElementById("txtCURP").value = celdas[4].textContent;
            document.getElementById("txtDireccion").value = celdas[7].textContent;
            document.getElementById("txtCodigoPostal").value = celdas[9].textContent;
            document.getElementById("txtCiudad").value = celdas[10].textContent;
            document.getElementById("txtEstado").value = celdas[11].textContent;
            document.getElementById("txtTelefono").value = celdas[8].textContent;
            document.getElementById("txtSucursal").value = celdas[14].textContent;
            document.getElementById("txtRol").value = celdas[13].textContent;
            document.getElementById("txtPuesto").value = celdas[16].textContent;
            document.getElementById("txtSalario").value = celdas[12].textContent;
            document.getElementById("btnAdd").classList.add("disabled");
            document.getElementById("btnUpdate").classList.remove("disabled");
            document.getElementById("btnDelete").classList.remove("disabled");
        }
    });
}

function insertarEmpleado() {
    const ruta = "http://localhost:8080/todosGetAll/api/central/insertarEmpleado";
    let v_nombre = document.getElementById("txtNombre").value;
    let v_apellidoPaterno = document.getElementById("txtApellidoPaterno").value;
    let v_apellidoMaterno = document.getElementById("txtApellidoMaterno").value;
    let v_genero = document.getElementById("txtGenero").value;
    let v_fecha_nacimiento = document.getElementById("dateBirth").value;
    let v_rfc = document.getElementById("txtRFC").value;
    let v_curp = document.getElementById("txtCURP").value;
    let v_direccion = document.getElementById("txtDireccion").value;
    let v_codigoPostal = document.getElementById("txtCodigoPostal").value;
    let v_ciudad = document.getElementById("txtCiudad").value;
    let v_estado = document.getElementById("txtEstado").value;
    let v_telefono = document.getElementById("txtTelefono").value;
    let v_foto = document.getElementById("txtFoto").value;
    let v_sucursal = document.getElementById("txtSucursal").value;
    let v_rol = document.getElementById("txtRol").value;
    let v_puesto = document.getElementById("txtPuesto").value;
    let v_salario = document.getElementById("txtSalario").value;

    var partes = v_fecha_nacimiento.split("-");
    var nuevoFormato = [partes[2], partes[1], partes[0]];
    v_fecha_nacimiento = nuevoFormato.join("/");

    let persona = {
        nombre: v_nombre,
        apellidoPaterno: v_apellidoPaterno,
        apellidoMaterno: v_apellidoMaterno,
        genero: v_genero,
        fechaNacimiento: v_fecha_nacimiento, // Cambiar el nombre del atributo
        rfc: v_rfc,
        curp: v_curp,
        domicilio: v_direccion, // Cambiar el nombre del atributo
        codigoPostal: v_codigoPostal,
        ciudad: v_ciudad,
        estado: v_estado,
        telefono: v_telefono,
        foto: v_foto
    };

    let empleado =
            {
                puesto: v_puesto,
                salarioBruto: v_salario // Cambiar el nombre del atributo
            };

    let rolUsuario =
            {
                rol: v_rol // Agregar el atributo rol
            };

    let sucursal = {
        idSucursal: v_sucursal
    };

    empleado.persona = persona; // Asignar el objeto persona al atributo persona del objeto empleado
    empleado.rolUsuario = rolUsuario; // Asignar el objeto rolUsuario al atributo rolUsuario del objeto empleado
    empleado.sucursal = sucursal; // Asignar el objeto sucursal al atributo sucsucursal del objeto empleado

    let params = {datosEmpleado: JSON.stringify(empleado)};

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(params)
    };

    fetch(ruta, requestOptions)
            .then(
                    function (data) {
                        return data.json();
                    })
            .then(function (json)
            {
                getAllEmpleados();
                alert(json.result);
            })
            .catch(function (error) { // Atrapar y mostrar cualquier error que ocurra
                alert(error.message);
            });
}

function getAllEmpleados() {
    let ruta = "http://localhost:8080/todosGetAll/api/central/getAllEmpleados";

    fetch(ruta)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const bodyTabla = document.getElementById("tblEmpleados");
                bodyTabla.innerHTML = "";

                data.forEach(function (empleado) {
                    const fila = '<tr scope="row">' +
                            '<td>' + empleado.codigo + '</td>' +
                            '<td>' + empleado.persona.nombre + '</td>' +
                            '<td>' + empleado.persona.apellidoPaterno + ' ' + empleado.persona.apellidoMaterno + '</td>' +
                            '<td class="d-none">' + empleado.persona.fechaNacimiento + '</td>' +
                            '<td class="d-none">' + empleado.persona.curp + '</td>' +
                            '<td class="d-none">' + empleado.persona.rfc + '</td>' +
                            '<td class="d-none">' + empleado.persona.genero + '</td>' +
                            '<td class="d-none">' + empleado.persona.domicilio + '</td>' +
                            '<td class="d-none">' + empleado.persona.telefono + '</td>' +
                            '<td class="d-none">' + empleado.persona.codigoPostal + '</td>' +
                            '<td class="d-none">' + empleado.persona.ciudad + '</td>' +
                            '<td class="d-none">' + empleado.persona.estado + '</td>' +
                            '<td class="d-none">' + empleado.salarioBruto + '</td>' +
                            '<td class="d-none">' + empleado.rolUsuario.rol + '</td>' +
                            '<td class="d-none">' + empleado.sucursal.idSucursal + '</td>' +
                            '<td>' + empleado.sucursal.nombreS + '</td>' +
                            '<td>' + empleado.puesto + '</td>' +
                            '<td>' + empleado.activo + '</td>' +
                            '</tr>';
                    bodyTabla.innerHTML += fila;
                    seleccionarFila();
                    clean();
                });
                //seleccionarFila(); class="d-none"
            });
}

document.addEventListener('DOMContentLoaded', (event) => {
    cargarSucursales();
});

function cargarSucursales()
{
    let ruta = "http://localhost:8080/todosGetAll/api/central/getAllSucursales";
    fetch(ruta)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const select = document.getElementById('txtSucursal');
                data.forEach(sucursal => {
                    const option = document.createElement('option');
                    option.value = sucursal.idSucursal;
                    option.text = sucursal.nombreS;
                    select.add(option);
                });
            });
}

function clean() {
    document.getElementById("txtCodigo").value = null;
    document.getElementById("txtNombre").focus();
    document.getElementById("txtNombre").value = null;
    document.getElementById("txtApellidoPaterno").value = null;
    document.getElementById("txtApellidoMaterno").value = null;
    document.getElementById("txtGenero").value = null;
    document.getElementById("dateBirth").value = null;
    document.getElementById("txtRFC").value = null;
    document.getElementById("txtCURP").value = null;
    document.getElementById("txtDireccion").value = null;
    document.getElementById("txtCodigoPostal").value = null;
    document.getElementById("txtCiudad").value = null;
    document.getElementById("txtEstado").value = null;
    document.getElementById("txtTelefono").value = null;
    document.getElementById("txtSucursal").value = null;
    document.getElementById("txtRol").value = null;
    document.getElementById("txtPuesto").value = null;
    document.getElementById("txtSalario").value = null;
    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnAdd").classList.remove("disabled");
    //indexEmpleadoSeleccionado = 0;
}

function deleteEmpleado() {
    const ruta = "http://localhost:8080/todosGetAll/api/central/eliminarEmpleado";
    let v_codigo = document.getElementById("txtCodigo").value;

    let empleado = {
        codigo: v_codigo
    };

    let params = {codigo: JSON.stringify(empleado)};

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(params)
    };

    fetch(ruta, requestOptions)
            .then(
                    function (data) {
                        return data.json();
                    })
            .then(function (json)
            {
                getAllEmpleados();
                alert(json.result);
            })
            .catch(function (error) { // Atrapar y mostrar cualquier error que ocurra
                alert(error.message);
            });
}

function updateEmpleado() {
    const ruta = "http://localhost:8080/todosGetAll/api/central/actualizarEmpleado";
    let v_nombre = document.getElementById("txtNombre").value;//1
    let v_apellidoPaterno = document.getElementById("txtApellidoPaterno").value;//2
    let v_apellidoMaterno = document.getElementById("txtApellidoMaterno").value;//3
    let v_genero = document.getElementById("txtGenero").value;//4
    let v_fecha_nacimiento = document.getElementById("dateBirth").value;//5
    let v_rfc = document.getElementById("txtRFC").value;//6
    let v_curp = document.getElementById("txtCURP").value;//7
    let v_direccion = document.getElementById("txtDireccion").value;//8
    let v_codigoPostal = document.getElementById("txtCodigoPostal").value;//9
    let v_ciudad = document.getElementById("txtCiudad").value;//10
    let v_estado = document.getElementById("txtEstado").value;//11
    let v_telefono = document.getElementById("txtTelefono").value;//12
    let v_sucursal = document.getElementById("txtSucursal").value;//13
    let v_rol = document.getElementById("txtRol").value;//14
    let v_puesto = document.getElementById("txtPuesto").value;//15
    let v_salario = document.getElementById("txtSalario").value;//16
    let v_codigo = document.getElementById("txtCodigo").value;//17

    var partes = v_fecha_nacimiento.split("-");
    var nuevoFormato = [partes[2], partes[1], partes[0]];
    v_fecha_nacimiento = nuevoFormato.join("/");

    let persona = {
        nombre: v_nombre,
        apellidoPaterno: v_apellidoPaterno,
        apellidoMaterno: v_apellidoMaterno,
        genero: v_genero,
        fechaNacimiento: v_fecha_nacimiento, // Cambiar el nombre del atributo
        rfc: v_rfc,
        curp: v_curp,
        domicilio: v_direccion, // Cambiar el nombre del atributo
        codigoPostal: v_codigoPostal,
        ciudad: v_ciudad,
        estado: v_estado,
        telefono: v_telefono
    };

    let empleado =
            {
                codigo: v_codigo,
                puesto: v_puesto,
                salarioBruto: v_salario, // Cambiar el nombre del atributo
                idSucursal: v_sucursal
            };

    let rolUsuario =
            {
                rol: v_rol // Agregar el atributo rol
            };

    let sucursal = {
        idSucursal: v_sucursal
    };

    empleado.persona = persona; // Asignar el objeto persona al atributo persona del objeto empleado
    empleado.rolUsuario = rolUsuario; // Asignar el objeto rolUsuario al atributo rolUsuario del objeto empleado
    empleado.sucursal = sucursal; // Asignar el objeto sucursal al atributo sucsucursal del objeto empleado

    let params = {actualizarEmpleado: JSON.stringify(empleado)};

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(params)
    };

    fetch(ruta, requestOptions)
            .then(
                    function (data) {
                        return data.json();
                    })
            .then(function (json)
            {
                getAllEmpleados();
                alert(json.result);
            })
            .catch(function (error) { // Atrapar y mostrar cualquier error que ocurra
                alert(error.message);
            });
}

$(document).ready(function () {
    $("#buscarEmpleado").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tblEmpleados tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});
