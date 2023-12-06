let productoSeleccionado;
let productos = [];

getAllClientes();

function getAllClientes() {
    let ruta = "http://localhost:8080/todosGetAll/api/central/getAllClientes";

    fetch(ruta)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const bodyTabla = document.getElementById("tblEmpleados");
                bodyTabla.innerHTML = "";

                data.forEach(function (cliente) {
                    const fila = '<tr>' +
                            '<td>' + cliente.idCliente + '</td>' +
                            '<td>' + cliente.persona.nombre + '</td>' +
                            '<td>' + cliente.persona.apellidoPaterno + ' ' + cliente.persona.apellidoMaterno + '</td>' +
                            '<td>' + cliente.persona.telefono + '</td>' +
                            '<td>' + cliente.persona.rfc + '</td>' +
                            '<td>' + cliente.estatus + '</td>' +
                            '</tr>';
                    bodyTabla.innerHTML += fila;
                });
                //seleccionarFila();
            });
}

export function agregarProducto() {
    let     codigo,
            nombre,
            apellidoP,
            apellidoM,
            genero,
            rfc,
            product,
            curp,
            direccion,
            cod_postal,
            ciudad,
            estado,
            birth,
            fecha,
            tel,
            corr,
            status;


    nombre = document.getElementById("txtNombre").value;
    apellidoP = document.getElementById("txtApellidoP").value;
    apellidoM = document.getElementById("txtApellidoM").value;
    genero = document.getElementById("genero").value;
    rfc = document.getElementById("txtRFC").value;
    curp = document.getElementById("txtCURP").value;
    direccion = document.getElementById("direccion").value;
    cod_postal = document.getElementById("CPostal").value;
    ciudad = document.getElementById("txtCiudad").value;
    estado = document.getElementById("txtEstado").value;
    birth = document.getElementById("txtBirth").value;
    fecha = document.getElementById("txtFecha").value;
    tel = document.getElementById("tel").value;
    corr = document.getElementById("corr").value;
    status = document.getElementById("status").value;
    ;

    let producto = {};
    producto.codigo = productos.length + 1;
    producto.nombre = nombre;
    producto.apellidoP = apellidoP;
    producto.apellidoM = apellidoM;
    producto.genero = genero;
    producto.rfc = rfc;
    producto.curp = curp;
    producto.direccion = direccion;
    producto.cod_postal = cod_postal;
    producto.ciudad = ciudad;
    producto.birth = birth;
    producto.fecha = fecha;
    producto.tel = tel;
    producto.corr = corr;
    producto.status = "activo";
    productos.push(producto);
    clean();
    loadTabla();
}



export function loadTabla() {
    let cuerpo = "";
    productos.forEach(function (producto) {
        let registro =
                '<tr onclick="moduloLogin1.selectProducto(' + productos.indexOf(producto) + ');">' +
                '<td>' + producto.codigo + '</td>' +
                '<td>' + producto.nombre + '</td>' +
                '<td>' + producto.apellidoP + producto.apellidoM + '</td>' +
                '<td>' + producto.tel + '</td>' +
                '<td>' + producto.rfc + '</td>' +
                '<td>' + producto.status + '</td>';
        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblPedidoVendedor").innerHTML = cuerpo;

}

export function selectProducto(indice) {
    document.getElementById("txtNombre").value = productos[indice].nombre;
    document.getElementById("txtApellidoP").value = productos[indice].apellidoP;
    document.getElementById("txtApellidoM").value = productos[indice].apellidoM;
    document.getElementById("genero").value = productos[indice].genero;
    document.getElementById("txtRFC").value = productos[indice].rfc;
    document.getElementById("txtCURP").value = productos[indice].curp;
    document.getElementById("direccion").value = productos[indice].direccion;
    document.getElementById("CPostal").value = productos[indice].cod_postal;
    document.getElementById("txtCiudad").value = productos[indice].ciudad;
    document.getElementById("txtEstado").value = productos[indice].estado;
    document.getElementById("txtBirth").value = productos[indice].birth;
    document.getElementById("txtFecha").value = productos[indice].fecha;
    document.getElementById("tel").value = productos[indice].tel;
    document.getElementById("corr").value = productos[indice].corr;


    document.getElementById("btnEliminarP").classList.remove("disabled");
    document.getElementById("btnAgregarP").classList.add("disabled");
    productoSeleccionado = indice;
}

export function actualizarProducto() {
    let     codigo,
            nombre,
            apellidoP,
            apellidoM,
            genero,
            rfc,
            product,
            curp,
            direccion,
            cod_postal,
            ciudad,
            estado,
            birth,
            fecha,
            tel,
            corr,
            status;

    nombre = document.getElementById("txtNombre").value;
    apellidoP = document.getElementById("txtApellidoP").value;
    apellidoM = document.getElementById("txtApellidoM").value;
    genero = document.getElementById("genero").value;
    rfc = document.getElementById("txtRFC").value;
    curp = document.getElementById("txtCURP").value;
    direccion = document.getElementById("direccion").value;
    cod_postal = document.getElementById("CPostal").value;
    ciudad = document.getElementById("txtCiudad").value;
    estado = document.getElementById("txtEstado").value;
    birth = document.getElementById("txtBirth").value;
    fecha = document.getElementById("txtFecha").value;
    tel = document.getElementById("tel").value;
    corr = document.getElementById("corr").value;
    status = document.getElementById("status").value;
    ;

    let producto = {};
    producto.codigo = codigo;
    producto.nombre = nombre;
    producto.apellidoP = apellidoP;
    producto.apellidoM = apellidoM;
    producto.genero = genero;
    producto.rfc = rfc;
    producto.curp = curp;
    producto.direccion = direccion;
    producto.cod_postal = cod_postal;
    producto.ciudad = ciudad;
    producto.birth = birth;
    producto.fecha = fecha;
    producto.tel = tel;
    producto.corr = corr;
    producto.status = "activo";
    productos.push(producto);
    clean();
    loadTabla();

    productos[productoSeleccionado] = producto;
    clean();
    loadTabla();
}

export function clean() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellidoP").value = "";
    document.getElementById("txtApellidoM").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("txtRFC").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("CPostal").value = "";
    document.getElementById("txtCiudad").value = "";
    document.getElementById("txtEstado").value = "";
    document.getElementById("txtBirth").value = "";
    document.getElementById("txtFecha").value = "";
    document.getElementById("tel").value = "";
    document.getElementById("corr").value = "";

    document.getElementById("txtNombre").focus();
    document.getElementById("btnEliminarP").classList.remove("disabled");
    document.getElementById("btnAgregarP").classList.add("disabled");
    productoSeleccionado = 0;
}


export function eliminarProducto() {
    productos[productoSeleccionado].status = "Inactivo";
    clean();
    loadTabla();
}

document.getElementById("pedidoBuscar").addEventListener("keyup", function () {
    searchProducto();
});

document.getElementById("btnBuscar").addEventListener("click", function () {
    searchProducto();
});

export function searchProducto() {
    const searchEmp = document.getElementById("pedidoBuscar").value.toLowerCase();
    const filteredEmployees = productos.filter(empleado =>
        empleado.nombre.toLowerCase().includes(searchEmp) ||
                empleado.apellidoP.toLowerCase().includes(searchEmp) ||
                empleado.tel.toLowerCase().includes(searchEmp) ||
                empleado.rfc.toLowerCase().includes(searchEmp) ||
                empleado.status.toLowerCase().includes(searchEmp)
    );

    loadTablas(filteredEmployees);
}

export function loadTablas(empleadosData) {
    const tablaBody = document.getElementById("tblPedidoVendedor");
    let cuerpo = "";

    empleadosData.forEach((producto, index) => {
        const registro = `
            <tr onclick="moduloLogin1.selectEmpleado(${index});">
                <td>${producto.codigo}</td>
                <td>${producto.nombre}</td>
                <td>${producto.apellidoP}</td>
                <td>${producto.tel}</td>
                <td>${producto.rfc}</td>
                <td>${producto.status}</td>
            </tr>`;
        cuerpo += registro;
    });

    tablaBody.innerHTML = cuerpo;
}

