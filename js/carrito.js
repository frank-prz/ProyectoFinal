const tabla = document.getElementById("tablaCarrito");
const totalGeneral = document.getElementById("totalGeneral");
const vaciarBtn = document.getElementById("vaciarBtn");
const confirmarBtn = document.getElementById("confirmarBtn");
const cancelarBtn = document.getElementById("cancelarBtn");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

carrito = carrito.map(p => ({
  ...p,
  precio: parseFloat(p.precio),
  costo: p.costo !== undefined ? parseFloat(p.costo) : 0,
  cantidad: p.cantidad || 1
}));

function cargarCarrito() {
  tabla.innerHTML = "";
  let total = 0;

  carrito.forEach((p, i) => {
    let subtotal = p.precio * p.cantidad;
    total += subtotal;

    tabla.innerHTML += `
      <tr>
        <td>${p.nombre}</td>
        <td>$${p.precio.toFixed(2)}</td>
        <td>
          <input type="number" min="1" value="${p.cantidad}" onchange="actualizar(${i}, this.value)">
        </td>
        <td>$${subtotal.toFixed(2)}</td>
        <td>
          <button onclick="eliminar(${i})">Eliminar</button>
        </td>
      </tr>
    `;
  });

  totalGeneral.innerText = "Total: $" + total.toFixed(2);
}

function actualizar(i, cantidad) {
  const c = parseInt(cantidad);
  if (isNaN(c) || c < 1) return;
  carrito[i].cantidad = c;
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

function eliminar(i) {
  carrito.splice(i, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

function vaciar() {
  if (confirm("¿Desea vaciar el carrito?")) {
    carrito = [];
    localStorage.removeItem("carrito");
    cargarCarrito();
  }
}

function confirmar() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  let ventas = JSON.parse(localStorage.getItem("ventas")) || [];

  carrito.forEach(p => {
    ventas.push({
      nombre: p.nombre,
      precio: parseFloat(p.precio),
      costo: parseFloat(p.costo),
      cantidad: p.cantidad,
      fecha: new Date().toISOString().split("T")[0]
    });
  });

  localStorage.setItem("ventas", JSON.stringify(ventas));

  alert("Compra confirmada. ¡Venta registrada!");
  carrito = [];
  localStorage.removeItem("carrito");
  cargarCarrito();
}


function cancelar() {
  if (confirm("¿Desea cancelar la compra?")) {
    carrito = [];
    localStorage.removeItem("carrito");
    cargarCarrito();
  }
}

window.actualizar = actualizar;
window.eliminar = eliminar;

vaciarBtn.addEventListener("click", vaciar);
confirmarBtn.addEventListener("click", confirmar);
cancelarBtn.addEventListener("click", cancelar);

cargarCarrito();
