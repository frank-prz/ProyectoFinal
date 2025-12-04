const form = document.getElementById("formCategoria");
const tabla = document.getElementById("tablaCategorias");

let categorias = JSON.parse(localStorage.getItem("categorias")) || [];

function cargarCategorias() {
  tabla.innerHTML = "";
  categorias.forEach((c, i) => {
    tabla.innerHTML += `
      <tr>
        <td>${c.id}</td>
        <td>${c.nombre}</td>
        <td>
          <button onclick="eliminar(${i})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const nombre = nombreCategoria.value.trim();

  const existe = categorias.some(c => c.nombre.toLowerCase() === nombre.toLowerCase());
  if (existe) {
    alert("La categoría ya existe");
    return;
  }

  const nueva = {
    id: categorias.length + 1,
    nombre: nombre
  };

  categorias.push(nueva);
  localStorage.setItem("categorias", JSON.stringify(categorias));
  form.reset();
  cargarCategorias();
});

function eliminar(i) {
  categorias.splice(i, 1);
  localStorage.setItem("categorias", JSON.stringify(categorias));
  cargarCategorias();
}

cargarCategorias();
