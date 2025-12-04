const form = document.getElementById("formProducto");
const tabla = document.getElementById("tablaProductos");
const selectCategoria = document.getElementById("categoria");

let productos = JSON.parse(localStorage.getItem("productos")) || [];
let categorias = JSON.parse(localStorage.getItem("categorias")) || [];

function cargarCategorias() {
  selectCategoria.innerHTML = "";
  categorias.forEach(c => {
    selectCategoria.innerHTML += `
      <option value="${c.nombre}">${c.nombre}</option>
    `;
  });
}

function cargarProductos() {
  tabla.innerHTML = "";
  productos.forEach((p, i) => {
    tabla.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.nombre}</td>
        <td>${p.categoria}</td>
        <td>${p.costo}</td>
        <td>${p.precio}</td>
        <td>${p.estado}</td>
        <td>${p.fecha}</td>
        <td>
          <button onclick="eliminar(${i})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const costo = parseFloat(document.getElementById("costo").value);
  const precio = parseFloat(document.getElementById("precio").value);

  if (precio <= costo) {
    alert("El precio debe ser mayor al costo");
    return;
  }



  const nuevo = {
    id: productos.length + 1,
    nombre: nombre.value,
    descripcion: descripcion.value,
    categoria: categoria.value,
    costo: costo.toFixed(2),
    precio: precio.toFixed(2),
    etiqueta: etiqueta.value,
    estado: estado.value,
    imagen: imagen.value,
    fecha: new Date().toISOString().split("T")[0]
  };

  productos.push(nuevo);
  localStorage.setItem("productos", JSON.stringify(productos));
  form.reset();
  cargarProductos();
});

function eliminar(i) {
  productos.splice(i, 1);
  localStorage.setItem("productos", JSON.stringify(productos));
  cargarProductos();
}

cargarCategorias();
cargarProductos();
