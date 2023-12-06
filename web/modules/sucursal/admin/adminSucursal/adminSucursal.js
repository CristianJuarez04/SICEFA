let indexSucursalSeleccionada;
let sucursales = [];

getAllSucursal();
/*
fetch("sucursal/dataSucursal.json")
        .then(response => {
            return response.json();
        })
        .then(function (jsondata) {
            sucursales = jsondata;
            console.log(sucursales);
            loadTabla();
        }
        );*/

export function addSucursal() {
    let     nombre_suc,
            longitud,
            latitud,
            direccion,
            cod_postal,
            nombre_tit,
            rfc,
            genero,
            generoSelected,
            telefono,
            codigo;

    nombre_suc = document.getElementById("txtNombre").value;
    longitud = document.getElementById("txtLongitud").value;
    latitud = document.getElementById("txtLatitud").value;
    direccion = document.getElementById("txtDireccion").value;
    cod_postal = document.getElementById("txtCP").value;
    nombre_tit = document.getElementById("txtSucursal").value;
    rfc = document.getElementById("txtRFC").value;
    genero = document.getElementById("txtGenero").value;
    generoSelected = "";

    for (let i = 0; i < genero.length; i++) {
        if (genero[i].checked) {
            generoSelected = genero[i].value;
            break;
        }
    }

    telefono = document.getElementById("txtTelefono").value;
    codigo = document.getElementById("txtCodigo").value;
    ;

    let sucursal = {};
    sucursal.nombre_suc = nombre_suc;
    sucursal.longitud = longitud;
    sucursal.latitud = latitud;
    sucursal.direccion = direccion;
    sucursal.cod_postal = cod_postal;
    sucursal.nombre_tit = nombre_tit;
    sucursal.rfc = rfc;
    sucursal.genero = genero;
    sucursal.telefono = telefono;
    sucursal.estatus = "Activo";
    sucursal.codigo = sucursales.length + 1;
    sucursales.push(sucursal);
    clean();
    loadTabla();
}

function getAllSucursal()
{
    let ruta = "http://localhost:8080/todosGetAll/api/central/getAllSucursales";
    
    fetch(ruta)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const bodyTabla = document.getElementById("tblSucursales");
                bodyTabla.innerHTML = "";
                let cuerpo = "";

                data.forEach(function (sucursales) {
                    const fila = '<tr>' +
                            '<td>' + sucursales.idSucursal + '</td>' +
                            '<td>' + sucursales.nombre + '</td>' +
                            '<td>' + sucursales.titular + '</td>' +
                            '<td>' + sucursales.domicilio + '</td>' +
                            '<td>' + sucursales.telefono + '</td>' +
                            '<td>' + sucursales.estatus + '</td></tr>';
                    cuerpo += fila;
                });
                bodyTabla.innerHTML = cuerpo;
                //selectProducto();
            });
}

export function loadTabla() {
    let cuerpo = "";
    sucursales.forEach(function (sucursal) {
        let registro =
                '<tr onclick="moduloLogin1.selectSucursal(' + sucursales.indexOf(sucursal) + ');">' +
                '<td>' + sucursal.codigo + '</td>' +
                '<td>' + sucursal.nombre_suc + '</td>' +
                '<td>' + sucursal.nombre_tit + '</td>' +
                '<td>' + sucursal.direccion + '</td>' +
                '<td>' + sucursal.telefono + '</td>' +
                '<td>' + sucursal.estatus + '</td></tr>';
        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblSucursales").innerHTML = cuerpo;

}

export function selectSucursal(index) {
    document.getElementById("txtSucursal").value = sucursales[index].nombre_suc;
    document.getElementById("txtNombre").value = sucursales[index].nombre_tit;
    document.getElementById("txtLongitud").value = sucursales[index].longitud;
    document.getElementById("txtRFC").value = sucursales[index].rfc;
    document.getElementById("txtLatitud").value = sucursales[index].latitud;
    document.getElementById("txtGenero").value = sucursales[index].genero;
    document.getElementById("txtDireccion").value = sucursales[index].direccion;
    document.getElementById("txtTelefono").value = sucursales[index].telefono;
    document.getElementById("txtCP").value = sucursales[index].cod_postal;
    document.getElementById("txtCodigo").value = sucursales[index].codigo;
    document.getElementById("btnUpdate").classList.remove("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnAdd").classList.add("disabled");
    indexSucursalSeleccionada = index;
}

export function clean() {
    document.getElementById("txtSucursal").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtLongitud").value = "";
    document.getElementById("txtRFC").value = "";
    document.getElementById("txtLatitud").value = "";
    document.getElementById("txtGenero").value = "";
    document.getElementById("txtDireccion").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtCP").value = "";
    document.getElementById("txtCodigo").value = "";
    document.getElementById("txtNombre").focus();
    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnAdd").classList.remove("disabled");
    indexSucursalSeleccionada = 0;
}

export function updateSucursal() {
    let     nombre_suc,
            longitud,
            latitud,
            direccion,
            cod_postal,
            nombre_tit,
            rfc,
            genero,
            generoSelected,
            telefono,
            codigo;

    nombre_suc = document.getElementById("txtNombre").value;
    longitud = document.getElementById("txtLongitud").value;
    latitud = document.getElementById("txtLatitud").value;
    direccion = document.getElementById("txtDireccion").value;
    cod_postal = document.getElementById("txtCP").value;
    nombre_tit = document.getElementById("txtSucursal").value;
    rfc = document.getElementById("txtRFC").value;
    genero = document.getElementById("txtGenero").value;
    generoSelected = "";

    for (let i = 0; i < genero.length; i++) {
        if (genero[i].checked) {
            generoSelected = genero[i].value;
            break;
        }
    }

    telefono = document.getElementById("txtTelefono").value;
    codigo = document.getElementById("txtCodigo").value;
    ;

    let sucursal = {};
    sucursal.nombre_suc = nombre_suc;
    sucursal.longitud = longitud;
    sucursal.latitud = latitud;
    sucursal.direccion = direccion;
    sucursal.cod_postal = cod_postal;
    sucursal.nombre_tit = nombre_tit;
    sucursal.rfc = rfc;
    sucursal.genero = genero;
    sucursal.telefono = telefono;
    sucursal.estatus = "Activo";
    sucursal.codigo = sucursales.length + 1;
    sucursales[indexSucursalSeleccionada] = sucursal;
    clean();
    loadTabla();
}

export function deleteSucursal() {
    sucursales [indexSucursalSeleccionada].estatus = "Inactivo";
    clean();
    loadTabla();
}


document.getElementById("buscarSucursal").addEventListener("keyup", searchSucursal);
document.getElementById("btnBuscar").addEventListener("click", searchSucursal);

export function searchSucursal() {
    const searchSuc = document.getElementById("buscarSucursal").value.toLowerCase();
    const filteredSucursales = sucursales.filter(sucursal =>
        sucursal.nombre_suc.toLowerCase().includes(searchSuc) ||
                sucursal.nombre_tit.toLowerCase().includes(searchSuc) ||
                sucursal.direccion.toLowerCase().includes(searchSuc) ||
                sucursal.telefono.toLowerCase().includes(searchSuc) ||
                sucursal.estatus.toLowerCase().includes(searchSuc)
    );

    loadTablas(filteredSucursales);
}

export function loadTablas(sucursalesData) {
    const tablaBody = document.getElementById("tblSucursales");
    let cuerpo = "";

    sucursalesData.forEach((sucursal, index) => {
        const registro = `
            <tr onclick="moduloLogin1.selectSucursal(${index});">
               <td>${sucursal.codigo}</td> 
                <td>${sucursal.nombre_suc}</td>
                <td>${sucursal.nombre_tit}</td>
                <td>${sucursal.direccion}</td>
                <td>${sucursal.telefono}</td>
                <td>${sucursal.estatus}</td>
            </tr>`;
        cuerpo += registro;
    });

    tablaBody.innerHTML = cuerpo;
}