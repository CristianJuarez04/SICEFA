//app.js
let moduloLoginCentral;

function adminSucursal() {
    fetch("adminSucursal/sucursal.html").then(
            function (response) {
                return response.text();
            }
    ).then(
            function (html) {
                document.getElementById("contenidoAdmin").innerHTML = html;
                import("./adminSucursal/sucursal.js").then(
                        function (controller) {
                            moduloLogin1 = controller;
                        });
            });
}

function adminEmpleado() {
    fetch("./adminEmpleado/empleado.html").then(
            function (response) {
                return response.text();
            }
    ).then(
    function (html) {
                document.getElementById("contenidoAdmin").innerHTML = html;
                var oldScript = document.getElementById('empleadoScript');
                if (oldScript) {
                    oldScript.remove();
                }
                var script = document.createElement('script');
                script.id = 'empleadoScript';
                script.src = "./adminEmpleado/empleado.js";
                document.body.appendChild(script);
            });
}

function adminProducto() {
    fetch("adminProducto/producto.html").then(
            function (response) {
                return response.text();
            }
    ).then(
            function (html) {
                document.getElementById("contenidoAdmin").innerHTML = html;
                import("./adminProducto/adminProducto.js").then(
                        function (controller) {
                            moduloLogin1 = controller;
                        });
            });
}

function adminCliente() {
    fetch("adminCliente/cliente.html").then(
            function (response) {
                return response.text();
            }
    ).then(
            function (html) {
                document.getElementById("contenidoAdmin").innerHTML = html;
                var oldScript = document.getElementById('clienteScript');
                if (oldScript) {
                    oldScript.remove();
                }
                var script = document.createElement('script');
                script.id = 'clienteScript';
                script.src = "./adminCliente/cliente.js";
                document.body.appendChild(script);
            });
}

function adminVenta() {
    fetch("adminVenta/venta.html").then(
            function (response) {
                return response.text();
            }
    ).then(
            function (html) {
                document.getElementById("contenidoAdmin").innerHTML = html;
                import("./adminVenta/adminVenta.js").then(
                        function (controller) {
                            moduloLogin1 = controller;
                        });
            });
}