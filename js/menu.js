document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuario) {
    window.location.href = "../html/login.html";
    return;
  }

  const botonesAdmin = document.querySelectorAll(".admin");
  const botonesCliente = document.querySelectorAll(".cliente");

  botonesAdmin.forEach(btn => btn.style.display = "inline-block");
  botonesCliente.forEach(btn => btn.style.display = "inline-block");

  if (usuario.rol !== "admin") {
    botonesAdmin.forEach(btn => btn.style.display = "none");
  }

});
