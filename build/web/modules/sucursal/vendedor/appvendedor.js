//app.js
let moduloLoginCentral;

function vendedorProducto() {
    fetch("vendedorProducto/producto.html").then(
            function (response) {
                return response.text();
            }
    ).then(
            function (html) {
                document.getElementById("contenidoVendedor").innerHTML = html;
                import("./vendedorProducto/vendedorProducto.js").then(
                        function (controller) {
                            moduloLogin1 = controller;
                        });
            });
}

function vendedorPedido() {
    fetch("vendedorPedido/pedido.html").then(
            function (response) {
                return response.text();
            }
    ).then(
            function (html) {
                document.getElementById("contenidoVendedor").innerHTML = html;
                import("./vendedorPedido/vendedorPedido.js").then(
                        function (controller) {
                            moduloLogin1 = controller;
                        });
            });
}

function vendedorCliente() {
     fetch("vendedorCliente/cliente.html").then(
            function (response) {
                return response.text();
            }
    ).then(
            function (html) {
                document.getElementById("contenidoVendedor").innerHTML = html;
                import("./vendedorCliente/cliente.js").then(
                        function (controller) {
                            moduloLogin1 = controller;
                        });
            });
}

function vendedorVenta() {
    fetch("vendedorVenta/venta.html").then(
            function (response) {
                return response.text();
            }
    ).then(
            function (html) {
                document.getElementById("contenidoVendedor").innerHTML = html;
                import("./vendedorVenta/vendedorVenta.js").then(
                        function (controller) {
                            moduloLogin1 = controller;
                        });
            });
}
