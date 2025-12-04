const form = document.getElementById("formRegistro");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

if (!usuarios.some(u => u.rol === "admin")) {
  usuarios.push({
    nombre: "Administrador",
    correo: "admin@ecosystem.com",
    password: "12345",
    rol: "admin",
    fecha: new Date().toISOString().split("T")[0]
  });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const nuevo = {
    nombre: nombre.value,
    correo: correo.value,
    password: password.value,
    rol: "cliente", 
    fecha: new Date().toISOString().split("T")[0]
  };

  const existe = usuarios.some(u => u.correo === nuevo.correo);
  if (existe) {
    alert("Este correo ya está registrado");
    return;
  }

  usuarios.push(nuevo);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Registro exitoso. Ahora puedes iniciar sesión.");
  window.location.href = "login.html";
});
