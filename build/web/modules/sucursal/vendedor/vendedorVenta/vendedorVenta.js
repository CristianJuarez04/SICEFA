let indexVentaSeleccionada;
let ventas = [];

fetch("adminVenta/dataVentas.json")
        .then(response => {
            return response.json();
        })
        .then(function (jsondata) {
            ventas = jsondata;
            console.log(ventas);
            loadTabla();
        }
        );

export function addVenta() {
    let     solicitante,
            idCompra,
            fecha,
            codigo,
            cantidad,
            idCliente,
            precio,
            total;


    solicitante = document.getElementById("txtSolicitante").value;
    idCompra = document.getElementById("idCompra").value;
    fecha = document.getElementById("dateRegistro").value;
    codigo = document.getElementById("txtCodigo").value;
    cantidad = document.getElementById("txtCantidad").value;
    idCliente = document.getElementById("idCliente").value;
    precio = document.getElementById("txtPrecio").value;
    total = document.getElementById("txtTotal").value;
    ;

    let venta = {};
    venta.solicitante = solicitante;
    venta.idCompra = idCompra;
    venta.fecha= fecha;
    venta.codigo = venta.length + 1;
    venta.cantidad = cantidad;
    venta.idCliente = idCliente;
    venta.precio = precio;
    venta.total = total;
    ventas.push(venta);
    clean();
    loadTabla();
}

export function loadTabla() {
    let cuerpo = "";
    ventas.forEach(function (venta) {
        let registro =
                '<tr onclick="moduloLogin1.selectVenta(' + ventas.indexOf(venta) + ');">' +
                '<td>' + venta.codigo + '</td>' +
                '<td>' + venta.idCompra + '</td>' +
                '<td>' + venta.idCliente + '</td>' +
                '<td>' + venta.cantidad + '</td>' +
                '<td>' + venta.total + '</td>';
        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblVentas").innerHTML = cuerpo;

}

export function selectVenta(index) {
    document.getElementById("txtSolicitante").value = ventas[index].solicitante;
    document.getElementById("idCompra").value = ventas[index].idCompra;
    document.getElementById("dateRegistro").value = ventas[index].fecha;
    document.getElementById("txtCodigo").value = ventas[index].codigo;
    document.getElementById("txtCantidad").value= ventas[index].cantidad;
    document.getElementById("idCliente").value = ventas[index].idCliente;
    document.getElementById("txtPrecio").value= ventas[index].precio;
    document.getElementById("txtTotal").value = ventas[index].total;
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnAdd").classList.add("disabled");
    indexVentaSeleccionada = index;
}

export function clean() {
    document.getElementById("txtSolicitante").value = "";
    document.getElementById("idCompra").value = "";
    document.getElementById("dateRegistro").value = "";
    document.getElementById("txtCodigo").value = "";
    document.getElementById("txtCantidad").value= "";
    document.getElementById("idCliente").value = "";
    document.getElementById("txtPrecio").value= "";
    document.getElementById("txtTotal").value = "";
    document.getElementById("txtSolicitante").focus();
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnAdd").classList.remove("disabled");
    indexVentaSeleccionada = 0;
}

export function deleteVenta() {
    ventas[indexVentaSeleccionada].estatus = "Cancelada";
    clean();
    loadTabla();
}


document.getElementById("buscarVenta").addEventListener("keyup", searchVenta);
document.getElementById("btnBuscar").addEventListener("click", searchVenta);

export function searchVenta() {
    const searchVenta = document.getElementById("buscarVenta").value.toLowerCase();
    const filteredVenta = ventas.filter(venta =>
                venta.idCompra.includes(searchVenta) ||
                venta.idCliente.includes(searchVenta) ||
                venta.cantidad.includes(searchVenta) ||
                venta.total.includes(searchVenta)        
    );

    loadTablas(filteredVenta);
}

export function loadTablas(ventasData) {
    const tablaBody = document.getElementById("tblVentas");
    let cuerpo = "";
    ventasData.forEach((venta, index) => {
        const registro = `
            <tr onclick="moduloLogin1.selectVenta(${index});">
                <td>${venta.codigo}</td>
                <td>${venta.idCompra}</td>
                <td>${venta.idCliente}</td>
                <td>${venta.cantidad}</td>
                <td>${venta.total}</td>
            </tr>`;
        cuerpo += registro;
    });

    tablaBody.innerHTML = cuerpo;
}