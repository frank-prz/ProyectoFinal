const tabla = document.getElementById("tablaGanancias");
const totalTxt = document.getElementById("totalGanancias");
const filtroMes = document.getElementById("filtroMes");
const filtroProducto = document.getElementById("filtroProducto");

let ventas = JSON.parse(localStorage.getItem("ventas")) || [];
let productos = JSON.parse(localStorage.getItem("productos")) || [];

function cargarMeses() {
  const meses = [...new Set(ventas.map(v => v.fecha.slice(0,7)))];
  meses.forEach(m => {
    filtroMes.innerHTML += `<option value="${m}">${m}</option>`;
  });
}

function cargarProductos() {
  productos.forEach(p => {
    filtroProducto.innerHTML += `<option value="${p.nombre}">${p.nombre}</option>`;
  });
}

function mostrarTabla(lista) {
  tabla.innerHTML = "";
  let total = 0;

  lista.forEach(v => {
    const ganancia = (v.precio - v.costo) * v.cantidad;
    total += ganancia;

    tabla.innerHTML += `
      <tr>
        <td>${v.fecha}</td>
        <td>${v.nombre}</td>
        <td>${v.cantidad}</td>
        <td>$${(v.precio * v.cantidad).toFixed(2)}</td>
        <td>$${(v.costo * v.cantidad).toFixed(2)}</td>
        <td>$${ganancia.toFixed(2)}</td>
      </tr>
    `;
  });

  totalTxt.innerText = "Total Ganancias: $" + total.toFixed(2);
}

function aplicarFiltros() {
  let mes = filtroMes.value;
  let prod = filtroProducto.value;

  let filtrados = ventas.filter(v => {
    let cumpleMes = mes === "" || v.fecha.startsWith(mes);
    let cumpleProd = prod === "" || v.nombre === prod;
    return cumpleMes && cumpleProd;
  });

  mostrarTabla(filtrados);
}

cargarMeses();
cargarProductos();
mostrarTabla(ventas);
