fetch("inventario/inventarioData.json")
        .then(response =>{
            return response.json();
        })
        .then(function(jsondata){
                productos = jsondata;
                console.log(productos);
                loadTabla();
            }            
        );

function agregarProducto(){
    let nombre, 
        nombreGenerico,
        formaFarmaceutica,
        unidadMedida,
        mainIndicacion,
        presentacion,
        contraindicacion,
        concentracion,
        unidadEnvase,
        precioUnitario,
        rutaFoto,
        status,
        codigoBarras;

    nombre = document.getElementById("txtNombre").value;
    nombreGenerico = document.getElementById("txtNGenerico").value;
    formaFarmaceutica = document.getElementById("txtForma").value;
    unidadMedida = document.getElementById("txtUMedida").value;
    mainIndicacion = document.getElementById("txtAplicacion").value;
    presentacion = document.getElementById("txtPresentacion").value;
    contraindicacion = document.getElementById("txtContraindicaciones").value;
    concentracion = document.getElementById("txtConcentracion").value;
    unidadEnvase = document.getElementById("uEnvase").value;
    precioUnitario = document.getElementById("pUnitario").value;
    rutaFoto = document.getElementById("foto").value;
    status = document.getElementById("txtEstatus").value; 
    codigoBarras = document.getElementById("cBarras").value;;
    
    let producto = {};
    producto.nombre =  nombre;
    producto.nombreGenerico = nombreGenerico;
    producto.formaFarmaceutica = formaFarmaceutica;
    producto.unidadMedida = unidadMedida;
    producto.mainIndicacion = mainIndicacion;
    producto.presentacion = presentacion;
    producto.contraindicacion = contraindicacion;
    producto.unidadEnvase = unidadEnvase;
    producto.precioUnitario = precioUnitario;
    producto.rutaFoto = rutaFoto;
    producto.status = "Activo";
    producto.codigoBarras;
    productos.push(producto);
    clean();
    loadTabla();
}

function loadTabla(){
    let cuerpo = "";
    productos.forEach(function (producto){
        let registro =  
                '<tr onclick="moduloLogin1.selectProducto('+ productos.indexOf(producto) +');">'+ 
                '<td>' + producto.nombre + '</td>' +
                '<td>' + producto.nombreGenerico + '</td>' +
                '<td>' + producto.formaFarmaceutica + '</td>' +
                '<td>' + producto.unidadMedida + '</td>' +
                '<td>' + producto.mainIndicacion + '</td>' +
                '<td>' + producto.presentacion + '</td>' +
                '<td>' + producto.contraindicacion + '</td>' +
                '<td>' + producto.unidadEnvase + '</td>'+
                '<td>' + producto.precioUnitario + '</td>'+
                '<td>' + producto.rutaFoto + '</td>'+
                '<td>' + producto.status + '</td>'+
                '<td>' + producto.codigoBarras + '</td></tr>' ; 
        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblInventario").innerHTML = cuerpo;
    
}

function selectProducto(indice){
    document.getElementById("txtNombre").value = productos[indice].nombre;
    document.getElementById("txtNGenerico").value = productos[indice].nombreGenerico ;
    document.getElementById("txtForma").value = productos[indice].formaFarmaceutica;
    document.getElementById("txtUMedida").value = productos[indice].unidadMedida;
    document.getElementById("txtAplicacion").value = productos[indice].mainIndicacion;
    document.getElementById("txtPresentacion").value = productos[indice].presentacion;
    document.getElementById("txtContraindicaciones").value = productos[indice].contraindicacion;
    document.getElementById("txtConcentracion").value = productos[indice].concentracion;
    document.getElementById("uEnvase").value = productos[indice].unidadEnvase;
    document.getElementById("pUnitario").value = productos[indice].precioUnitario;
    document.getElementById("foto").value = productos[indice].rutaFoto;
    document.getElementById("txtEstatus").value = productos[indice].status;
    document.getElementById("cBarras").value = productos[indice].codigoBarras;
    
    document.getElementById("btnActualizarP").classList.remove("disabled");
    document.getElementById("btnEliminarP").classList.remove("disabled");
    document.getElementById("btnAgregarP").classList.add("disabled");
    productoSeleccionado = indice;
}

function clean(){
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtNGenerico").value = "" ;
    document.getElementById("txtForma").value = "";
    document.getElementById("txtUMedida").value = "";
    document.getElementById("txtAplicacion").value = "";
    document.getElementById("txtPresentacion").value = "";
    document.getElementById("txtContraindicaciones").value = "";
    document.getElementById("txtConcentracion").value = "";
    document.getElementById("uEnvase").value = "";
    document.getElementById("pUnitario").value = "";
    document.getElementById("foto").value = "";
    document.getElementById("txtEstatus").value = "";
    document.getElementById("cBarras").value = "";
    
    document.getElementById("txtNombre").focus();
    document.getElementById("btnActualizarP").classList.remove("disabled");
    document.getElementById("btnEliminarP").classList.remove("disabled");
    document.getElementById("btnAgregarP").classList.add("disabled");
    productoSeleccionado = 0;
}

function actualizarProducto(){
    let nombre, 
        nombreGenerico,
        formaFarmaceutica,
        unidadMedida,
        mainIndicacion,
        presentacion,
        contraindicacion,
        concentracion,
        unidadEnvase,
        precioUnitario,
        rutaFoto,
        status,
        codigoBarras;

    nombre = document.getElementById("txtNombre").value;
    nombreGenerico = document.getElementById("txtNGenerico").value;
    formaFarmaceutica = document.getElementById("txtForma").value;
    unidadMedida = document.getElementById("txtUMedida").value;
    mainIndicacion = document.getElementById("txtAplicacion").value;
    presentacion = document.getElementById("txtPresentacion").value;
    contraindicacion = document.getElementById("txtContraindicaciones").value;
    concentracion = document.getElementById("txtConcentracion").value;
    unidadEnvase = document.getElementById("uEnvase").value;
    precioUnitario = document.getElementById("pUnitario").value;
    rutaFoto = document.getElementById("foto").value;
    status = document.getElementById("txtEstatus").value; 
    codigoBarras = document.getElementById("cBarras").value;;
    
    let producto = {};
    producto.nombre =  nombre;
    producto.nombreGenerico = nombreGenerico;
    producto.formaFarmaceutica = formaFarmaceutica;
    producto.unidadMedida = unidadMedida;
    producto.mainIndicacion = mainIndicacion;
    producto.presentacion = presentacion;
    producto.contraindicacion = contraindicacion;
    producto.unidadEnvase = unidadEnvase;
    producto.precioUnitario = precioUnitario;
    producto.rutaFoto = rutaFoto;
    producto.status = "Activo";
    producto.codigoBarras;
    
    productos[productoSeleccionado] = producto;
    clean();
    loadTabla();
}

function eliminarProducto(){
    productos[productoSeleccionado].status = "Inactivo";
    clean();
    loadTabla();
}

document.getElementById("productoBuscar").addEventListener("keyup", function () {
    searchProducto();
});

document.getElementById("btnBuscar").addEventListener("click", function () {
    searchProducto();
});

function searchProducto() {
    let searchTerm = document.getElementById("productoBuscar").value.toLowerCase();
    let filteredProductos = productos.filter(function (producto) {
        return (
            producto.nombre.toLowerCase().includes(searchTerm) ||
            producto.nombreGenerico.toLowerCase().includes(searchTerm) ||
            producto.formaFarmaceutica.toLowerCase().includes(searchTerm) ||
            producto.unidadMedida.toLowerCase().includes(searchTerm)
        );
    });

    loadTablas(filteredProductos);
}

function loadTablas(productosData) {
    let cuerpo = "";
    productosData.forEach(function (producto) {
        let registro =  
                '<tr onclick="moduloLogin1.selectProducto('+ productos.indexOf(producto) +');">'+ 
                '<td>' + producto.nombre + '</td>' +
                '<td>' + producto.nombreGenerico + '</td>' +
                '<td>' + producto.formaFarmaceutica + '</td>' +
                '<td>' + producto.unidadMedida + '</td>' +
                '<td>' + producto.mainIndicacion + '</td>' +
                '<td>' + producto.presentacion + '</td>' +
                '<td>' + producto.contraindicacion + '</td>' +
                '<td>' + producto.unidadEnvase + '</td>'+
                '<td>' + producto.precioUnitario + '</td>'+
                '<td>' + producto.rutaFoto + '</td>'+
                '<td>' + producto.status + '</td>'+
                '<td>' + producto.codigoBarras + '</td></tr>' ; 
        cuerpo += registro;
    });
    document.getElementById("tblInventario").innerHTML = cuerpo;
}