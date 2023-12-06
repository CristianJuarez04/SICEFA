let moduloClientes;
let moduloEmpleados;
let moduloProductos;
let moduloPedidos;
let moduloVentas;

console.log("Hola desde Controller Main")

function cargarModuloSucursalAC(){
    fetch("modules/central/inicio.html")
            .then(
                function(response){
                    return response.text();
                }
            )
            .then(
                function(html){
                    document.getElementById("contenidoAdmin").innerHTML = html;
                    import ("../modules/clientes/controllerInicio.js").then(
                            function(controller){
                                moduloClientes = controller;
                            }
                            );
                }
            );
}