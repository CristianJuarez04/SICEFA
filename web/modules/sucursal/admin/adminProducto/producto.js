getAllProductos();

function seleccionarFila() {
    var tabla = document.getElementById("tblProductos");
    tabla.addEventListener("click", function (event) {
        let nombre = document.getElementById("txtNombre");
        nombre.focus();
        //nombre.window.scrollTo(0, document.querySelector("#txtNombre").offsetTop);

        var elemento = event.target;
        if (elemento.tagName === "TD") {
            var fila = elemento.parentNode;
            fila.classList.toggle("seleccion");

            // Obtener las celdas de la fila
            var celdas = fila.getElementsByTagName("td");

            // Llenar los campos de entrada con la información de la fila
            var idProducto = celdas[0].textContent;


            document.getElementById("ID").value = celdas[0].textContent;
            document.getElementById("txtNombre").value = celdas[1].textContent;
            document.getElementById("txtNGenerico").value = celdas[2].textContent;
            document.getElementById("txtForma").value = celdas[3].textContent;
            document.getElementById("txtUMedida").value = celdas[4].textContent;
            document.getElementById("txtAplicacion").value = celdas[6].textContent;
            document.getElementById("txtPresentacion").value = celdas[5].textContent;
            document.getElementById("txtContraindicaciones").value = celdas[7].textContent;
            document.getElementById("txtConcentracion").value = celdas[8].textContent;
            document.getElementById("uEnvase").value = celdas[9].textContent;
            document.getElementById("pUnitario").value = celdas[11].textContent;
            document.getElementById("pCompra").value = celdas[10].textContent;
            document.getElementById("foto").value = celdas[12].textContent;
            document.getElementById("cBarras").value = celdas[13].textContent;
            document.getElementById("btnAgregarP").classList.add("disabled");
            document.getElementById("btnActualizarP").classList.remove("disabled");
            document.getElementById("btnEliminarP").classList.remove("disabled");
        }
    });
}

function getAllProductos() {
    let ruta = "http://localhost:8080/todosGetAll/api/central/getAllProductos";

    fetch(ruta)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const bodyTabla = document.getElementById("tblProductos");
                bodyTabla.innerHTML = "";

                data.forEach(function (producto) {
                    const fila = '<tr scope="row">' +
                            '<td>' + producto.idProducto + '</td>' +
                            '<td>' + producto.nombre + '</td>' +
                            '<td>' + producto.nombreGenerico + '</td>' +
                            '<td>' + producto.formaFarmaceutica + '</td>' +
                            '<td>' + producto.unidadMedida + '</td>' +
                            '<td>' + producto.presentacion + '</td>' +
                            '<td>' + producto.principalIndicacion + '</td>' +
                            '<td>' + producto.contraindicaciones + '</td>' +
                            '<td>' + producto.concentracion + '</td>' +
                            '<td>' + producto.unidadesEnvase + '</td>' +
                            '<td class="d-none">' + producto.precioCompra + '</td>' +
                            '<td>' + producto.precioVenta + '</td>' +
                            '<td class="d-none">' + producto.foto + '</td>' +
                            '<td class="d-none">' + producto.rutaFoto + '</td>' +
                            '<td>' + producto.estatus + '</td>' +
                            '<td>' + producto.codigoBarras + '</td>' +
                            '</tr>';
                    bodyTabla.innerHTML += fila;
                    seleccionarFila();
                    limpiarCampos();
                });
            });
}

$(document).ready(function () {
    $("#buscarProducto").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tblProductos tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});
// Función para obtener los datos del servidor
/*function buscarProducto() {
 let filtro = document.getElementById("buscarProducto").value.toLowerCase();
 const tabla = document.getElementById("tblProducto").getElementsByTagName("tbody")[0];
 const filas = tabla.getElementsByTagName("tr");
 
 let filasAMostrar = [];
 
 for (let i = 0; i < filas.length; i++) {
 let celdas = filas[i].getElementsByTagName("td");
 let mostrarFila = false;
 
 for (let j = 0; j < celdas.length; j++) {
 let textoCelda = celdas[j].textContent.toLowerCase();
 
 if (textoCelda.includes(filtro) || (j === 1 && textoCelda.includes(filtro))) {
 mostrarFila = true;
 break;
 }
 }
 
 filasAMostrar.push({index: i, mostrar: mostrarFila});
 }
 
 actualizarEstiloVisualizacion(filasAMostrar);
 }*/

/*function actualizarEstiloVisualizacion(filasAMostrar) {
 const tabla = document.getElementById("tblProducto").getElementsByTagName("tbody")[0];
 
 for (let i = 0; i < filasAMostrar.length; i++) {
 let fila = tabla.getElementsByTagName("tr")[filasAMostrar[i].index];
 fila.style.display = filasAMostrar[i].mostrar ? "" : "none";
 }
 }*/



/*async function obtenerDatosDelServidor(ruta) {
 try {
 const response = await fetch(ruta);
 if (!response.ok) {
 throw new Error('Error en la solicitud: ' + response.statusText);
 }
 return await response.json();
 } catch (error) {
 throw new Error('Error al obtener datos del servidor: ' + error.message);
 }
 }
 
 datosOriginales = [];
 function procesarYMostrarDatos(data) {
 datosOriginales = data;
 console.log(data);
 const tabla = document.getElementById("tblProducto").getElementsByTagName('tbody')[0];
 tabla.innerHTML = "";
 
 data.forEach(function (fila) {
 let pCompra = fila.precioCompra;
 const nuevaFila = tabla.insertRow(-1);
 
 const idCell = nuevaFila.insertCell(0);
 idCell.innerHTML = fila.idProducto;
 
 const nombreCelll = nuevaFila.insertCell(1);
 nombreCelll.innerHTML = fila.nombre;
 
 const nombreGenericoCell = nuevaFila.insertCell(2);
 nombreGenericoCell.innerHTML = fila.nombreGenerico;
 
 const formaFarmaceuticaCell = nuevaFila.insertCell(3);
 formaFarmaceuticaCell.innerHTML = fila.formaFarmaceutica;
 
 const unidadMedidaCell = nuevaFila.insertCell(4);
 unidadMedidaCell.innerHTML = fila.unidadMedida;
 
 const presentacionCell = nuevaFila.insertCell(5);
 presentacionCell.innerHTML = fila.presentacion;
 
 const principalIndicacionCell = nuevaFila.insertCell(6);
 principalIndicacionCell.innerHTML = fila.principalIndicacion;
 
 const contraindicacionesCell = nuevaFila.insertCell(7);
 contraindicacionesCell.innerHTML = fila.contraindicaciones;
 
 const concentracionCell = nuevaFila.insertCell(8);
 concentracionCell.innerHTML = fila.concentracion;
 
 const unidadesEnvaseCell = nuevaFila.insertCell(9);
 unidadesEnvaseCell.innerHTML = fila.unidadesEnvase;
 
 const precioVentaCell = nuevaFila.insertCell(10);
 precioVentaCell.innerHTML = fila.precioVenta;
 
 const estatusCell = nuevaFila.insertCell(11);
 estatusCell.innerHTML = fila.estatus;
 
 const codigoBarrasCell = nuevaFila.insertCell(12);
 codigoBarrasCell.innerHTML = fila.codigoBarras;
 
 nuevaFila.addEventListener("click", function () {
 document.getElementById("ID").value = fila.idProducto;
 document.getElementById("txtNombre").value = fila.nombre;
 document.getElementById("txtNGenerico").value = fila.nombreGenerico;
 document.getElementById("txtForma").value = fila.formaFarmaceutica;
 document.getElementById("txtUMedida").value = fila.unidadMedida;
 document.getElementById("txtAplicacion").value = fila.principalIndicacion;
 document.getElementById("txtPresentacion").value = fila.presentacion;
 document.getElementById("uEnvase").value = fila.unidadesEnvase;
 document.getElementById("txtAplicacion").value = fila.principalIndicacion;
 document.getElementById("txtContraindicaciones").value = fila.contraindicaciones;
 document.getElementById("txtConcentracion").value = fila.concentracion;
 document.getElementById("pUnitario").value = fila.precioVenta;
 document.getElementById("pCompra").value = pCompra;
 document.getElementById("cBarras").value = fila.codigoBarras;
 document.getElementById("txtEstatus").value = fila.estatus;
 });
 });
 }*/

function insertarProducto() {
    let ruta = "http://localhost:8080/todosGetAll/api/central/insertarp";

    let v_nombre = document.getElementById("txtNombre").value;
    let v_nombreGenerico = document.getElementById("txtNGenerico").value;
    let v_FormaFarmaceutica = document.getElementById("txtForma").value;
    let v_unidadMedida = document.getElementById("txtUMedida").value;
    let v_principalIndicacion = document.getElementById("txtAplicacion").value;
    let v_presentacion = document.getElementById("txtPresentacion").value;
    let v_Contraindicaciones = document.getElementById("txtContraindicaciones").value;
    let v_Concentración = document.getElementById("txtConcentracion").value;
    let v_UnidadesEnvase = document.getElementById("uEnvase").value;
    let v_precioV = document.getElementById("pUnitario").value;
    let v_precioCompra = document.getElementById("pCompra").value;
    let v_rutaFoto = document.getElementById("foto").value;
    //let estatus = document.getElementById("txtEstatus").value;
    let v_codigoBarras = document.getElementById("cBarras").value;

    let producto = {
        nombre: v_nombre,
        nombreGenerico: v_nombreGenerico,
        formaFarmaceutica: v_FormaFarmaceutica,
        unidadMedida: v_unidadMedida,
        principalIndicacion: v_principalIndicacion,
        presentacion: v_presentacion,
        contraindicaciones: v_Contraindicaciones,
        concentracion: v_Concentración,
        unidadesEnvase: v_UnidadesEnvase,
        precioVenta: v_precioV,
        precioCompra: v_precioCompra,
        foto: "si",
        rutaFoto: v_rutaFoto,
        codigoBarras: v_codigoBarras
    };

    let params = {datosProducto: JSON.stringify(producto)};

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
                getAllProductos();
                alert(json.result);
            })
            .catch(function (error) { // Atrapar y mostrar cualquier error que ocurra
                alert(error.message);
            });
}

function actualizarProducto() {
    let ruta = "http://localhost:8080/todosGetAll/api/central/actualizar";

    let idProducto = document.getElementById("ID").value;
    let nombre = document.getElementById("txtNombre").value;
    let nombreGenerico = document.getElementById("txtNGenerico").value;
    let formaFarmaceutica = document.getElementById("txtForma").value;
    let unidadMedida = document.getElementById("txtUMedida").value;
    let principalIndicacion = document.getElementById("txtAplicacion").value;
    let presentacion = document.getElementById("txtPresentacion").value;
    let contraindicaciones = document.getElementById("txtContraindicaciones").value;
    let concentracion = document.getElementById("txtConcentracion").value;
    let unidadesEnvase = document.getElementById("uEnvase").value;
    let precioUnitario = document.getElementById("pUnitario").value;
    let precioCompra = document.getElementById("pCompra").value;
    //let rutaFoto = document.getElementById("foto").value;
    //let estatus = 1; //el valor debe ser remplazado
    let codigoBarras = document.getElementById("cBarras").value;

    let datos = {
        idProducto: idProducto,
        p_nombre: nombre,
        p_nombreGenerico: nombreGenerico,
        formaFarmaceutica: formaFarmaceutica,
        unidadMedida: unidadMedida,
        principalIndicacion: principalIndicacion,
        presentacion: presentacion,
        contraindicaciones: contraindicaciones,
        concentracion: concentracion,
        unidadesEnvase: unidadesEnvase,
        precioUnitario: precioUnitario,
        precioCompra: precioCompra,
        codigoBarras: codigoBarras
    };
    console.log(datos);
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
                getAllProductos();
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
}

function limpiarCampos() {
    // Obtén los elementos por su ID y establece su valor en vacío
    document.getElementById("ID").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtNGenerico").value = "";
    document.getElementById("txtForma").value = "";
    document.getElementById("txtUMedida").value = "";
    document.getElementById("txtAplicacion").value = "";
    document.getElementById("txtPresentacion").value = "";
    document.getElementById("txtContraindicaciones").value = "";
    document.getElementById("txtConcentracion").value = "";
    document.getElementById("uEnvase").value = "";
    document.getElementById("pUnitario").value = "";
    document.getElementById("pCompra").value = "";
    document.getElementById("foto").value = "";
    //document.getElementById("txtEstatus").value = "";
    document.getElementById("cBarras").value = "";
    document.getElementById("btnAgregarP").classList.remove("disabled");
    document.getElementById("btnActualizarP").classList.add("disabled");
    document.getElementById("btnEliminarP").classList.add("disabled");

}

function borrarProducto() {
    let ruta = "http://localhost:8080/todosGetAll/api/central/borrarp";

    let idProducto = document.getElementById("ID").value;

    let datos = {
        idProducto: idProducto
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
                getAllProductos();
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
}