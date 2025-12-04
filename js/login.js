const form = document.getElementById("formLogin");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

form.addEventListener("submit", e => {
  e.preventDefault();

  const user = usuarios.find(u =>
    u.correo === email.value && u.password === password.value
  );

  if (!user) {
    alert("Correo o contraseña incorrectos");
    return;
  }

  localStorage.setItem("usuarioActivo", JSON.stringify(user));

  if (user.rol === "admin") {
    window.location.href = "../index.html";
  } else {
    window.location.href = "../html/catalogo.html";
  }
});
