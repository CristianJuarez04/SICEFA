// app.js
let moduloLogin;

function cargarLogin1() {
    fetch("modules/login/loginadmin1.html").then(
            function (response) {
                return response.text();
            }
    ).then(
            function (html) {
                document.getElementById("contenido").innerHTML = html;
                import("../login/controllerLogins.js").then(
                        function (controller) {
                            moduloLogin = controller;
                        });
            });
}
//../modules/login/controllerLogins.js

function cargarLogin2() {
    fetch("modules/login/loginadmin2.html").then(
            function (response) {
                return response.text();
            }
    ).then(
            function (html) {
                document.getElementById("contenido").innerHTML = html;
                import("../login/controllerLogins.js").then(
                        function (controller) {
                            moduloLogin = controller;
                        });
            });
}

function cargarLogin3() {
    fetch("modules/login/loginvendedor.html").then(
            function (response) {
                return response.text();
            }
    ).then(
            function (html) {
                document.getElementById("contenido").innerHTML = html;
                import("../login/controllerLogins.js").then(
                        function (controller) {
                            moduloLogin = controller;
                        });
            });
}