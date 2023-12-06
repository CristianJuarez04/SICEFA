export function validarLoginCentral() {
    let user = document.getElementById("txtUsuarioAC").value;
    let password = document.getElementById("txtContraseñaAC").value;

    if (user !== "adminC") {
        Swal.fire({
            title: 'ERROR :c',
            text: 'Usuario incorrecto',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
        });
        document.getElementById('txtUsuarioAC').required = "required";
    } else if (password !== "1234C") {
        Swal.fire({
            title: 'ERROR :c',
            text: 'Contraseña incorrecta',
            icon: 'error',
            confirmButtonText: 'ni modo prrou pordos'
        });
        document.getElementById('txtContraseñaAC').required = "required";
    } else {
        window.location.href = 'modules/central/inicio.html';
    }
}

export function validarLoginSucursal() {
    let user = document.getElementById("txtUsuarioAS").value;
    let password = document.getElementById("txtContraseñaAS").value;

    if (user !== "adminS") {
        Swal.fire({
            title: 'ERROR :c',
            text: 'Usuario incorrecto',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
        });
        document.getElementById('txtUsuario').required = "required";
    } else if (password !== "1234S") {
        Swal.fire({
            title: 'ERROR :c',
            text: 'Contraseña incorrecta',
            icon: 'error',
            confirmButtonText: 'ni modo prrou pordos'
        });
        document.getElementById('txtContraseña').required = "required";
    } else {
        window.location.href = 'modules/sucursal/admin/inicio.html';
    }
}

export function validarVendedorSucursal() {
    let user = document.getElementById("txtUsuarioV").value;
    let password = document.getElementById("txtContraseñaV").value;

    if (user !== "vendedorS") {
        Swal.fire({
            title: 'ERROR :c',
            text: 'Usuario incorrecto',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
        });
        document.getElementById('txtUsuarioV').required = "required";
    } else if (password !== "1234VS") {
        Swal.fire({
            title: 'ERROR :c',
            text: 'Contraseña incorrecta',
            icon: 'error',
            confirmButtonText: 'ni modo prrou pordos'
        });
        document.getElementById('txtContraseñaV').required = "required";
    } else {
        window.location.href = 'modules/sucursal/vendedor/inicio.html';
    }
}