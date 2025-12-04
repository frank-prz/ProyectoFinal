const contenedor = document.getElementById("contenedorProductos");
const busqueda = document.getElementById("busqueda");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroEtiqueta = document.getElementById("filtroEtiqueta");

let productos = JSON.parse(localStorage.getItem("productos")) || [];
let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function cargarCategorias() {
    categorias.forEach(c => {
        filtroCategoria.innerHTML += `<option value="${c.nombre}">${c.nombre}</option>`;
    });
}

function mostrarProductos(lista) {
    contenedor.innerHTML = "";

    lista.forEach(p => {

        // Si la imagen empieza con http, es una URL
        const rutaImagen = p.imagen.startsWith("http")
            ? p.imagen
            : "../recursos/" + p.imagen;

        contenedor.innerHTML += `
      <div class="tarjeta">
<img src="${p.imagen}" onerror="this.src='../recursos/imagen-no-disponible.png'">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <p><b>${p.categoria}</b></p>
        <p>${p.etiqueta || "Sin etiqueta"}</p>
        <p class="precio">$${p.precio}</p>
        <button class="btn" onclick="agregar('${p.id}')">Agregar al carrito</button>
      </div>
    `;
    });
}


function aplicarFiltros() {
    let texto = busqueda.value.toLowerCase();
    let cat = filtroCategoria.value;
    let etq = filtroEtiqueta.value;

    let filtrados = productos.filter(p => {
        const coincideTexto =
            p.nombre.toLowerCase().includes(texto) ||
            p.descripcion.toLowerCase().includes(texto);

        const coincideCategoria = cat === "" || p.categoria === cat;
        const coincideEtiqueta = etq === "" || p.etiqueta === etq;

        return coincideTexto && coincideCategoria && coincideEtiqueta;
    });

    mostrarProductos(filtrados);
}

function agregar(id) {
    const prod = productos.find(p => p.id == id);
    const existe = carrito.find(c => c.id == id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({
            ...prod,
            cantidad: 1,
            fecha: new Date().toISOString().split("T")[0]
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
}

busqueda.addEventListener("input", aplicarFiltros);
filtroCategoria.addEventListener("change", aplicarFiltros);
filtroEtiqueta.addEventListener("change", aplicarFiltros);

cargarCategorias();
mostrarProductos(productos);
