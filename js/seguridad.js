const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuario) {
    window.location.href = "login.html";
}
