//- cargar los datos automaticamente
//- getall
//- clean
//- insertar
//- eliminar
//- update
//- seleccionar
getAllClientes();

//Funcion para verificar que los campos del formulario agregar empleados estan llenos y proseguir con las operaciones de ser asi
document.getElementById("btnAgregar").addEventListener('click', function (event) {
    event.preventDefault();
    let ruta = "http://localhost:8080/todosGetAll/api/central/insertCliente";
    let v_nombre = document.getElementById("txtNombre").value;
    let v_apellidoPaterno = document.getElementById("txtApellidoP").value;
    let v_apellidoMaterno = document.getElementById("txtApellidoM").value;
    let v_genero = document.getElementById("genero").value;
    let v_fecha_nacimiento = document.getElementById("txtBirth").value;
    let v_rfc = document.getElementById("txtRFC").value;
    let v_curp = document.getElementById("txtCURP").value;
    let v_domicilio = document.getElementById("txtDomicilio").value;
    let v_codigoPostal = document.getElementById("txtCPostal").value;
    let v_ciudad = document.getElementById("txtCiudad").value;
    let v_estado = document.getElementById("txtEstado").value;
    let v_telefono = document.getElementById("txtTelefono").value;

    if (v_nombre && v_apellidoPaterno && v_apellidoMaterno && v_genero && v_fecha_nacimiento && v_rfc && v_curp && v_domicilio && v_codigoPostal && v_ciudad && v_estado && v_telefono) {
        insertarCliente();
    } else {
        alert('Por favor, llene todos los campos antes de enviar el formulario.');
    }
});

//cargar los datos en la tabla automaticamente
/*ruta = "http://localhost:8080/todosGetAll/api/central/getAll";
 fetch(ruta)
 .then(function (response) {
 return response.json();
 })
 .then(function (data) {
 const bodyTabla = document.getElementById("tblCliente");
 bodyTabla.innerHTML = "";
 
 data.forEach(function (cliente) {
 const fila = '<tr>' +
 '<td>' + cliente.idCliente + '</td>' +
 '<td>' + cliente.nombre + '</td>' +
 '<td>' + cliente.apellidoPaterno + '</td>' +
 '<td>' + cliente.apellidoMaterno + '</td>' +
 '<td>' + cliente.telefono + '</td>' +
 '<td>' + cliente.rfc + '</td>' +
 '<td>' + cliente.estatus + '</td>' +
 '<td hidden>' + cliente.curp + '</td>' +
 '<td hidden>' + cliente.domicilio + '</td>' +
 '<td hidden>' + cliente.codigoPostal + '</td>' +
 '<td hidden>' + cliente.ciudad + '</td>' +
 '<td hidden>' + cliente.estado + '</td>' +
 '<td hidden>' + cliente.fechaNacimiento + '</td>' +
 '<td hidden>' + cliente.email + '</td>' +
 '</tr>';
 bodyTabla.innerHTML += fila;
 });
 });
 seleccionarFila();*/


//getall
function getAllClientes() {
    let ruta = "http://localhost:8080/todosGetAll/api/central/getAllC";
    fetch(ruta)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const bodyTabla = document.getElementById("tblCliente");
                bodyTabla.innerHTML = "";

                data.forEach(function (cliente) {
                    const fila = '<tr>' +
                            '<td>' + cliente.idCliente + '</td>' +
                            '<td>' + cliente.persona.nombre + '</td>' +
                            '<td>' + cliente.persona.apellidoPaterno + '</td>' +
                            '<td>' + cliente.persona.apellidoMaterno + '</td>' +
                            '<td>' + cliente.persona.telefono + '</td>' +
                            '<td>' + cliente.persona.rfc + '</td>' +
                            '<td>' + cliente.estatus + '</td>' +
                            '<td hidden>' + cliente.persona.curp + '</td>' +
                            '<td hidden>' + cliente.persona.domicilio + '</td>' +
                            '<td hidden>' + cliente.persona.codigoPostal + '</td>' +
                            '<td hidden>' + cliente.persona.ciudad + '</td>' +
                            '<td hidden>' + cliente.persona.estado + '</td>' +
                            '<td hidden>' + cliente.persona.fechaNacimiento + '</td>' +
                            '<td hidden>' + cliente.email + '</td>' +
                            '<td hidden>' + cliente.persona.genero + '</td>' +
                            '</tr>';
                    bodyTabla.innerHTML += fila;
                    seleccionarFila();
                    clean();
                });
            });
    seleccionarFila();
}

//limpiar campos
function clean() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellidoP").value = "";
    document.getElementById("txtApellidoM").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("txtRFC").value = "";
    document.getElementById("txtCURP").value = "";
    document.getElementById("txtDomicilio").value = "";
    document.getElementById("txtCPostal").value = "";
    document.getElementById("txtCiudad").value = "";
    document.getElementById("txtEstado").value = "";
    document.getElementById("txtBirth").value = "";
    document.getElementById("txtBirth").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtEmail").value = "";
    document.getElementById("txtIdCliente").value = "";

    document.getElementById("btnAgregar").classList.remove("disabled");
    document.getElementById("btnActualizar").classList.add("disabled");
    document.getElementById("btnEliminar").classList.add("disabled");
    let nombre = document.getElementById("txtNombre");
    nombre.focus();
}

//insertar
function insertarCliente() {
    let ruta = "http://localhost:8080/todosGetAll/api/central/insertCliente";
    let v_nombre = document.getElementById("txtNombre").value;
    let v_apellidoPaterno = document.getElementById("txtApellidoP").value;
    let v_apellidoMaterno = document.getElementById("txtApellidoM").value;
    let v_genero = document.getElementById("genero").value;
    let v_fecha_nacimiento = document.getElementById("txtBirth").value;
    let v_rfc = document.getElementById("txtRFC").value;
    let v_curp = document.getElementById("txtCURP").value;
    let v_domicilio = document.getElementById("txtDomicilio").value;
    let v_codigoPostal = document.getElementById("txtCPostal").value;
    let v_ciudad = document.getElementById("txtCiudad").value;
    let v_estado = document.getElementById("txtEstado").value;
    let v_telefono = document.getElementById("txtTelefono").value;
    let v_email = document.getElementById("txtEmail").value;

    var partes = v_fecha_nacimiento.split("-");
    var nuevoFormato = [partes[0], partes[1], partes[2]];
    v_fecha_nacimiento = nuevoFormato.join("/");

    let persona = {
        nombre: v_nombre,
        apellidoPaterno: v_apellidoPaterno,
        apellidoMaterno: v_apellidoMaterno,
        genero: v_genero,
        fechaNacimiento: v_fecha_nacimiento,
        rfc: v_rfc,
        curp: v_curp,
        domicilio: v_domicilio,
        codigoPostal: v_codigoPostal,
        ciudad: v_ciudad,
        estado: v_estado,
        telefono: v_telefono,
        foto: ""
    };

    let cliente =
            {
                email: v_email,
                //estatus: 1
            };

    cliente.persona = persona; // Asignar el objeto persona al atributo persona del objeto empleado

    let params = {datosCliente: JSON.stringify(cliente)};
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
                getAllClientes();
                alert(json.result);
            })
            .catch(function (error) { // Atrapar y mostrar cualquier error que ocurra
                alert(error.message);
            });
}

//eliminar
function eliminarCliente() {
    let ruta = "http://localhost:8080/todosGetAll/api/central/eliminarCliente";
    let v_idCliente = document.getElementById("txtIdCliente").value;

    let cliente = {
        idCliente: v_idCliente
    };

    let params = {datosCliente: JSON.stringify(cliente)};
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
                getAllClientes();
                alert(json.result);
            })
            .catch(function (error) { // Atrapar y mostrar cualquier error que ocurra
                alert(error.message);
            });
}

//actualizar
function updateCliente() {
    const ruta = "http://localhost:8080/todosGetAll/api/central/updateCliente";
    let v_idCliente = document.getElementById("txtIdCliente").value;
    let v_nombre = document.getElementById("txtNombre").value;
    let v_apellidoPaterno = document.getElementById("txtApellidoP").value;
    let v_apellidoMaterno = document.getElementById("txtApellidoM").value;
    let v_genero = document.getElementById("genero").value;
    let v_fecha_nacimiento = document.getElementById("txtBirth").value;
    let v_rfc = document.getElementById("txtRFC").value;
    let v_curp = document.getElementById("txtCURP").value;
    let v_domicilio = document.getElementById("txtDomicilio").value;
    let v_codigoPostal = document.getElementById("txtCPostal").value;
    let v_ciudad = document.getElementById("txtCiudad").value;
    let v_estado = document.getElementById("txtEstado").value;
    let v_telefono = document.getElementById("txtTelefono").value;
    let v_email = document.getElementById("txtEmail").value;
    //let v_estatus = document.getElementById("txtEstatus").value;

    var partes = v_fecha_nacimiento.split("-");
    var nuevoFormato = [partes[0], partes[1], partes[2]];
    v_fecha_nacimiento = nuevoFormato.join("/");

    let cliente = {
        idCliente: v_idCliente,
        email: v_email
                //estatus: v_estatus
    };

    let persona = {
        nombre: v_nombre,
        apellidoPaterno: v_apellidoPaterno,
        apellidoMaterno: v_apellidoMaterno,
        genero: v_genero,
        fechaNacimiento: v_fecha_nacimiento,
        rfc: v_rfc,
        curp: v_curp,
        domicilio: v_domicilio,
        codigoPostal: v_codigoPostal,
        ciudad: v_ciudad,
        estado: v_estado,
        telefono: v_telefono
    };

    cliente.persona = persona;

    let params = {datosCliente: JSON.stringify(cliente)};
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
                getAllClientes();
                alert(json.result);
            })
            .catch(function (error) { // Atrapar y mostrar cualquier error que ocurra
                alert(error.message);
            });
}

function seleccionarFila() {
    var tabla = document.getElementById("tblCliente");
    tabla.addEventListener("click", function (event) {
        let nombre = document.getElementById("txtNombre");
        nombre.focus();
        var elemento = event.target;
        if (elemento.tagName === "TD") {
            var fila = elemento.parentNode;
            fila.classList.toggle("seleccionada");

            // Obtener las celdas de la fila
            var celdas = fila.getElementsByTagName("td");

            document.getElementById("txtIdCliente").value = celdas[0].textContent;
            document.getElementById("txtNombre").value = celdas[1].textContent;
            document.getElementById("txtApellidoP").value = celdas[2].textContent;
            document.getElementById("txtApellidoM").value = celdas[3].textContent;
            document.getElementById("txtTelefono").value = celdas[4].textContent;
            document.getElementById("txtRFC").value = celdas[5].textContent;
            document.getElementById("genero").value = celdas[14].textContent;
            document.getElementById("txtCURP").value = celdas[7].textContent;
            document.getElementById("txtDomicilio").value = celdas[8].textContent;
            document.getElementById("txtCPostal").value = celdas[9].textContent;
            document.getElementById("txtCiudad").value = celdas[10].textContent;
            document.getElementById("txtEstado").value = celdas[11].textContent;
            document.getElementById("txtBirth").value = celdas[12].textContent;
            document.getElementById("txtEmail").value = celdas[13].textContent;

            document.getElementById("btnAgregar").classList.add("disabled");
            document.getElementById("btnActualizar").classList.remove("disabled");
            document.getElementById("btnEliminar").classList.remove("disabled");
        }
    });
}

/*export function searchCliente() {
 const searchEmp = document.getElementById("clienteBuscar").value.toLowerCase();
 const filteredClientes = clientes.filter(cliente =>
 cliente.nombre.toLowerCase().includes(searchEmp) ||
 cliente.apellidoP.toLowerCase().includes(searchEmp) ||
 cliente.tel.toLowerCase().includes(searchEmp) ||
 cliente.rfc.toLowerCase().includes(searchEmp) ||
 cliente.status.toLowerCase().includes(searchEmp)
 );
 
 loadTablas(filteredClientes);
 }*/


$(document).ready(function () {
    $("#clienteBuscar").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tblCliente tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});