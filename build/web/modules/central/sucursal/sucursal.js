/* global maptypes, configuracion */

getAllSucursal();

//Funcion para verificar que los campos del formulario agregar empleados estan llenos y proseguir con las operaciones de ser asi
document.getElementById("btnAdd").addEventListener('click', function (event) {
    event.preventDefault();
    let v_nombre = document.getElementById("txtSucursal").value;//1
    let v_titular = document.getElementById("txtTitular").value;//2
    let v_rfc = document.getElementById("txtRFC").value;//3
    let v_domocilio = document.getElementById("txtDomocilio").value;//4
    let v_Colonia = document.getElementById("txtColonia").value;//5
    let v_CP = document.getElementById("txtCP").value;//6
    let v_ciudad = document.getElementById("txtCiudad").value;//7
    let v_estado = document.getElementById("txtEstado").value;//8
    let v_telefono = document.getElementById("txtTelefono").value;//9
    let v_latitud = document.getElementById("txtLatitud").value;//10
    let v_longitud = document.getElementById("txtLongitud").value;//11

    if (v_nombre && v_titular && v_rfc && v_domocilio && v_Colonia && v_CP && v_ciudad && v_estado && v_telefono && v_latitud && v_latitud && v_longitud) {
        addSucursal();
    } else {
        alert('Por favor, llene todos los campos antes de enviar el formulario.');
    }
});


function seleccionarFila() {
    var tabla = document.getElementById("tblSucursales");
    tabla.addEventListener("click", function (event) {
        let nombre = document.getElementById("txtSucursal");
        nombre.focus();
        //nombre.window.scrollTo(0, document.querySelector("#txtSucursal").offsetTop);

        var elemento = event.target;
        if (elemento.tagName === "TD") {
            var fila = elemento.parentNode;
            fila.classList.toggle("seleccionada");

            // Obtener las celdas de la fila
            var celdas = fila.getElementsByTagName("td");

            // Llenar los campos de entrada con la información de la fila
            var codigo = celdas[0].textContent;

            document.getElementById("txtCodigo").value = celdas[0].textContent;//1
            document.getElementById("txtSucursal").value = celdas[1].textContent;//1
            document.getElementById("txtTitular").value = celdas[2].textContent;//2
            document.getElementById("txtRFC").value = celdas[3].textContent;//3
            document.getElementById("txtDomocilio").value = celdas[4].textContent;//4
            document.getElementById("txtColonia").value = celdas[5].textContent;//5
            document.getElementById("txtCP").value = celdas[6].textContent;//6
            document.getElementById("txtCiudad").value = celdas[7].textContent;//7
            document.getElementById("txtEstado").value = celdas[8].textContent;//8
            document.getElementById("txtTelefono").value = celdas[9].textContent;//9
            document.getElementById("txtLatitud").value = celdas[10].textContent;//10
            document.getElementById("txtLongitud").value = celdas[11].textContent;//11

            document.getElementById("btnAdd").classList.add("disabled");
            document.getElementById("btnUpdate").classList.remove("disabled");
            document.getElementById("btnDelete").classList.remove("disabled");
            mapa3();
        }
    });
}

function addSucursal() {
    let ruta = "http://localhost:8080/todosGetAll/api/central/insertarSucursal";

    let v_nombre = document.getElementById("txtSucursal").value;//1
    let v_titular = document.getElementById("txtTitular").value;//2
    let v_rfc = document.getElementById("txtRFC").value;//3
    let v_domocilio = document.getElementById("txtDomocilio").value;//4
    let v_Colonia = document.getElementById("txtColonia").value;//5
    let v_CP = document.getElementById("txtCP").value;//6
    let v_ciudad = document.getElementById("txtCiudad").value;//7
    let v_estado = document.getElementById("txtEstado").value;//8
    let v_telefono = document.getElementById("txtTelefono").value;//9
    let v_latitud = document.getElementById("txtLatitud").value;//10
    let v_longitud = document.getElementById("txtLongitud").value;//11

    let sucursal = {
        nombreS: v_nombre, //1
        titular: v_titular, //2
        rfc: v_rfc, //3
        domicilio: v_domocilio, //4
        colonia: v_Colonia, //5
        codigoPostal: v_CP, //6
        ciudad: v_ciudad, //7
        estado: v_estado, //8
        telefono: v_telefono, //9
        latitud: v_latitud, //10
        longitud: v_longitud//11
    };

    let params = {datosSucursal: JSON.stringify(sucursal)};

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
                getAllSucursal();
                alert(json.result);
            })
            .catch(function (error) { // Atrapar y mostrar cualquier error que ocurra
                alert(error.message);
            });
}

function editSucursal() {
    let ruta = "http://localhost:8080/todosGetAll/api/central/actualizarSucursal";

    let v_idS = document.getElementById("txtCodigo").value;//1
    let v_nombre = document.getElementById("txtSucursal").value;//1
    let v_titular = document.getElementById("txtTitular").value;//2
    let v_rfc = document.getElementById("txtRFC").value;//3
    let v_domocilio = document.getElementById("txtDomocilio").value;//4
    let v_Colonia = document.getElementById("txtColonia").value;//5
    let v_CP = document.getElementById("txtCP").value;//6
    let v_ciudad = document.getElementById("txtCiudad").value;//7
    let v_estado = document.getElementById("txtEstado").value;//8
    let v_telefono = document.getElementById("txtTelefono").value;//9
    let v_latitud = document.getElementById("txtLatitud").value;//10
    let v_longitud = document.getElementById("txtLongitud").value;//11

    let sucursal = {
        idSucursal: v_idS,
        nombreS: v_nombre, //1
        titular: v_titular, //2
        rfc: v_rfc, //3
        domicilio: v_domocilio, //4
        colonia: v_Colonia, //5
        codigoPostal: v_CP, //6
        ciudad: v_ciudad, //7
        estado: v_estado, //8
        telefono: v_telefono, //9
        latitud: v_latitud, //10
        longitud: v_longitud//11
    };

    let params = {datosSucursal: JSON.stringify(sucursal)};

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
                getAllSucursal();
                alert(json.result);
            })
            .catch(function (error) { // Atrapar y mostrar cualquier error que ocurra
                alert(error.message);
            });
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
                            '<td>' + sucursales.nombreS + '</td>' +
                            '<td>' + sucursales.titular + '</td>' +
                            '<td class = "d-none">' + sucursales.rfc + '</td>' +
                            '<td>' + sucursales.domicilio + '</td>' +
                            '<td class = "d-none">' + sucursales.colonia + '</td>' +
                            '<td class = "d-none">' + sucursales.codigoPostal + '</td>' +
                            '<td class = "d-none">' + sucursales.ciudad + '</td>' +
                            '<td class = "d-none">' + sucursales.estado + '</td>' +
                            '<td>' + sucursales.telefono + '</td>' +
                            '<td class = "d-none">' + sucursales.latitud + '</td>' +
                            '<td class = "d-none">' + sucursales.longitud + '</td>' +
                            '<td>' + sucursales.estatus + '</td></tr>';
                    cuerpo += fila;
                    seleccionarFila();
                    clean();
                });
                bodyTabla.innerHTML = cuerpo;
                //selectProducto();
            });
}

function loadTabla() {
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

/*function selectSucursal(index) {
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
 }*/

function clean() {
    document.getElementById("txtCodigo").value = null
    document.getElementById("txtSucursal").value = null;
    document.getElementById("txtTitular").value = null;
    document.getElementById("txtLongitud").value = null;
    document.getElementById("txtRFC").value = null;
    document.getElementById("txtLatitud").value = null;
    document.getElementById("txtColonia").value = null;
    document.getElementById("txtDomocilio").value = null;
    document.getElementById("txtTelefono").value = null;
    document.getElementById("txtCP").value = null;
    document.getElementById("txtCodigo").value = null;
    document.getElementById("txtCiudad").value = null;
    document.getElementById("txtEstado").value = null;
    document.getElementById("txtSucursal").focus();
    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnAdd").classList.remove("disabled");
    indexSucursalSeleccionada = 0;
}

function updateSucursal() {
    let     nombre_suc,
            longitud,
            latitud,
            direccion,
            cod_postal,
            nombre_tit,
            rfc,
            //genero,
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
    //genero = document.getElementById("txtGenero").value;
    generoSelected = "";

    /*for (let i = 0; i < genero.length; i++) {
     if (genero[i].checked) {
     generoSelected = genero[i].value;
     break;
     }
     }*/

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
    //sucursal.genero = genero;
    sucursal.telefono = telefono;
    sucursal.estatus = "Activo";
    sucursal.codigo = sucursales.length + 1;
    sucursales[indexSucursalSeleccionada] = sucursal;
    clean();
    loadTabla();
}

function deleteSucursal() {
    let ruta = "http://localhost:8080/todosGetAll/api/central/borrarSucursal";

    let idSucursal = document.getElementById("txtCodigo").value;

    let datos = {
        idSucursal: idSucursal
    };

    const formData = new URLSearchParams(datos).toString();

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: formData
    };

    fetch(ruta, requestOptions)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error en la solicitud');
                }
            })
            .then(function (json) {
                console.log(json);
                getAllSucursal();
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
}


/*document.getElementById("buscarSucursal").addEventListener("keyup", searchSucursal);
 document.getElementById("btnBuscar").addEventListener("click", searchSucursal);*/

function searchSucursal() {
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

function loadTablas(sucursalesData) {
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

$(document).ready(function () {
    $("#buscarSucursal").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tblSucursales tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});

function mapa3() {
    const platform = new H.service.Platform({"apikey": "ZI_h3pAUUt7gWjq7C1Tk3awS23RNDMqi6VLe88HIAi8"});
    const maptypes = platform.createDefaultLayers();
    let configuracion = {
        zoom: 11.5,
        center: {lat: 21.11869953404381, lng: -101.67402358933951}
    };

    // Eliminar mapa anterior si existe
    if (window.map3) {
        window.map3.dispose();
    }

    // Crear un nuevo mapa
    window.map3 = new H.Map(document.getElementById("divMapa3"),
            maptypes.vector.normal.map,
            configuracion);

    let long = document.getElementById("txtLongitud").value;
    let lati = document.getElementById("txtLatitud").value;

    if (lati === "" && long === "")
    {
        lati = 21.11869953404381;
        long = -101.67402358933951;
    }
    let marcador = new H.map.Marker({lat: lati, lng: long});
    window.map3.addObject(marcador);

    let eventos = new H.mapevents.MapEvents(window.map3);
    let comportamiento = new H.mapevents.Behavior(eventos);
}