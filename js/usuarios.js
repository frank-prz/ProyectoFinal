const form = document.getElementById("formUsuario");
const tabla = document.getElementById("tablaUsuarios");

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

function mostrarUsuarios() {
  tabla.innerHTML = "";

  usuarios.forEach((u, i) => {
    tabla.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${u.nombre}</td>
        <td>${u.correo}</td>
        <td>${u.rol}</td>
        <td>${u.fecha}</td>
        <td>
          ${u.rol !== "admin"
            ? `<button onclick="eliminar(${i})">Eliminar</button>`
            : "Protegido"}
        </td>
      </tr>
    `;
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const nuevo = {
    nombre: document.getElementById("nombre").value,
    correo: document.getElementById("correo").value,
    password: document.getElementById("password").value,
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

  form.reset();
  mostrarUsuarios();
});

function eliminar(i) {
  if (usuarios[i].rol === "admin") {
    alert("No se puede eliminar al administrador");
    return;
  }

  if (confirm("¿Eliminar usuario?")) {
    usuarios.splice(i, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    mostrarUsuarios();
  }
}

mostrarUsuarios();
