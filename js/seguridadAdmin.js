const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuario || usuario.rol !== "admin") {
  alert("Acceso denegado. Solo administradores.");
  window.location.href = "../html/catalogo.html";
}
