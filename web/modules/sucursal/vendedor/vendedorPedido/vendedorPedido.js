let productoSeleccionado;
let productos = [];

fetch("vendedorPedido/vendedor_pedid.json")
        .then(response => {
            return response.json();
        })
        .then(function (jsondata) {
            productos = jsondata;
            console.log(productos);
            loadTabla();
        }
        );



export function agregarProducto() {
    let     no_pedi,
            nombre_suc,
            nombre_emp,
            longitud,
            clave_pedi,
            latitud,
            product,
            direccion,
            cantidad,
            cod_postal,
            hora,
            fecha,
            status,
            precio;

    nombre_suc = document.getElementById("txtNSucursal").value;
    nombre_emp = document.getElementById("txtNombre").value;
    longitud = document.getElementById("longitud").value;
    clave_pedi = document.getElementById("ClavePedido").value;
    latitud = document.getElementById("latitud").value;
    product = document.getElementById("txtProducto").value;
    direccion = document.getElementById("txtDireccion").value;
    cantidad = document.getElementById("txtCantidad").value;
    cod_postal = document.getElementById("CPostal").value;
    hora = document.getElementById("hora").value;
    fecha = document.getElementById("fecha").value;
    status = document.getElementById("txtEstatus").value;
    precio = document.getElementById("precio").value;
    ;

    let producto = {};
    producto.no_pedi = productos.length +1;
    producto.nombre_suc = nombre_suc;
    producto.nombre_emp = nombre_emp;
    producto.longitud = longitud;
    producto.clave_pedi = productos.length +1;

    producto.latitud = latitud;
    producto.producto = producto;
    producto.direccion = direccion;
    producto.cantidad = cantidad;
    producto.cod_postal = cod_postal;
    producto.hora = hora;
    producto.status = "Activo";
    producto.precio = precio;
    productos.push(producto);
    clean();
    loadTabla();
}



export function loadTabla() {
    let cuerpo = "";
    var iva = 0.16;
    productos.forEach(function (producto) {
        var cant = parseFloat(producto.precio) * parseFloat(producto.cantidad);
        var ivat = (parseFloat(iva) * parseFloat(cant));
        var total = (parseFloat(cant) + parseFloat(ivat));
        let registro =
                '<tr onclick="moduloLogin1.selectProducto(' + productos.indexOf(producto) + ');">' +
                '<td>' + producto.no_pedi + '</td>' +
                '<td>' + producto.nombre_emp + '</td>' +
                '<td>' + producto.producto + '</td>' +
                '<td>' + producto.cantidad + '</td>' +
                '<td>' + "16%" + '</td>' +
                '<td>' + total + '</td>' +
                '<td>' + producto.status + '</td>';
        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblPedidoVendedor").innerHTML = cuerpo;

}

export function selectProducto(indice) {
    document.getElementById("txtNSucursal").value = productos[indice].nombre_suc;
    document.getElementById("txtNombre").value = productos[indice].nombre_emp;
    document.getElementById("longitud").value = productos[indice].longitud;
    document.getElementById("ClavePedido").value = productos[indice].clave_pedi;
    document.getElementById("latitud").value = productos[indice].latitud;
    document.getElementById("txtProducto").value = productos[indice].producto;
    document.getElementById("txtDireccion").value = productos[indice].direccion;
    document.getElementById("txtCantidad").value = productos[indice].cantidad;
    document.getElementById("CPostal").value = productos[indice].cod_postal;
    document.getElementById("hora").value = productos[indice].hora;
    document.getElementById("fecha").value = productos[indice].fecha;
    document.getElementById("precio").value = productos[indice].precio;
    document.getElementById("txtEstatus").value = productos[indice].status;


    document.getElementById("btnEliminarP").classList.remove("disabled");
    document.getElementById("btnAgregarP").classList.add("disabled");
    productoSeleccionado = indice;
}

export function clean() {
    document.getElementById("txtNSucursal").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("longitud").value = "";
    document.getElementById("ClavePedido").value = "";
    document.getElementById("latitud").value = "";
    document.getElementById("txtProducto").value = "";
    document.getElementById("txtDireccion").value = "";
    document.getElementById("txtCantidad").value = "";
    document.getElementById("CPostal").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("txtEstatus").value = "";
    document.getElementById("precio").value = "";

    document.getElementById("txtNSucursal").focus();
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
    let searchTerm = document.getElementById("pedidoBuscar").value.toLowerCase();
    let filteredProductos = productos.filter(function (producto) {
        return (
                
                producto.nombre_suc.toLowerCase().includes(searchTerm) ||
                producto.nombre_emp.toLowerCase().includes(searchTerm) ||
                producto.longitud.toLowerCase().includes(searchTerm)
                );
    });

    loadTablas(filteredProductos);
}

function loadTablas(productosData) {
    let cuerpo = "";
    var iva = 0.16;
    productos.forEach(function (producto) {
        var cant = parseFloat(producto.precio) * parseFloat(producto.cantidad);
        var ivat = (parseFloat(iva) * parseFloat(cant));
        var total = (parseFloat(cant) + parseFloat(ivat));
        let registro =
                '<tr onclick="moduloLogin1.selectProducto(' + productos.indexOf(producto) + ');">' +
                '<td>' + producto.no_pedi + '</td>' +
                '<td>' + producto.nombre_emp + '</td>' +
                '<td>' + producto.producto + '</td>' +
                '<td>' + producto.cantidad + '</td>' +
                '<td>' + "16%" + '</td>' +
                '<td>' + total + '</td>' +
                '<td>' + producto.status + '</td>';
        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblPedidoVendedor").innerHTML = cuerpo;
}