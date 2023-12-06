//app.js
let moduloLoginCentral;

function centralSucursal() {
    fetch("sucursal/sucursal.html").then(
            function (response) {
                return response.text();
            }
    ).then(
    function (html) {
            document.getElementById("contenidoCentral").innerHTML = html;
            var oldScript = document.getElementById('sucursalScript');
            if (oldScript) {
                oldScript.remove();
            }
            var script = document.createElement('script');
            script.id = 'sucursalScript';
            script.src = "./sucursal/sucursal.js";
            document.body.appendChild(script);
        });
}

function centralEmpleado() {
    fetch("./empleado/empleado.html").then(
        function (response) {
            return response.text();
        }
    ).then(
        function (html) {
            document.getElementById("contenidoCentral").innerHTML = html;
            var oldScript = document.getElementById('empleadoScript');
            if (oldScript) {
                oldScript.remove();
            }
            var script = document.createElement('script');
            script.id = 'empleadoScript';
            script.src = "./empleado/empleado.js";
            document.body.appendChild(script);
        });
}

function centralProducto() {
    fetch("producto/producto.html").then(
            function (response) {
                return response.text();
            }
    ).then(
    function (html) {
            document.getElementById("contenidoCentral").innerHTML = html;
            var oldScript = document.getElementById('productoScript');
            if (oldScript) {
                oldScript.remove();
            }
            var script = document.createElement('script');
            script.id = 'productoScript';
            script.src = "./producto/producto.js";
            document.body.appendChild(script);
        });
}

function centralPedido() {
    fetch("pedido/pedido.html").then(
            function (response) {
                return response.text();
            }
    ).then(
    function (html) {
            document.getElementById("contenidoCentral").innerHTML = html;
            var oldScript = document.getElementById('pedidoScript');
            if (oldScript) {
                oldScript.remove();
            }
            var script = document.createElement('script');
            script.id = 'pedidoScript';
            script.src = "./pedido/controllerPedido.js";
            document.body.appendChild(script);
        });
}

function centralInventario() {
    fetch("inventario/inventario.html").then(
            function (response) {
                return response.text();
            }
    ).then(
    function (html) {
            document.getElementById("contenidoCentral").innerHTML = html;
            var oldScript = document.getElementById('inventarioScript');
            if (oldScript) {
                oldScript.remove();
            }
            var script = document.createElement('script');
            script.id = 'inventarioScript';
            script.src = "inventario/controllerInventario.js";
            document.body.appendChild(script);
        });
}