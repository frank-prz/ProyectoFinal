const form = document.getElementById("formContacto");
const limpiarBtn = document.getElementById("limpiarBtn");
const feedback = document.getElementById("feedback");

// Guardar contacto en localStorage bajo la clave "contactos"
function guardarContacto(obj) {
  const contactos = JSON.parse(localStorage.getItem("contactos")) || [];
  contactos.push(obj);
  localStorage.setItem("contactos", JSON.stringify(contactos));
}

function mostrarFeedback(texto, esError = false) {
  feedback.textContent = texto;
  feedback.classList.remove("hidden");
  feedback.style.background = esError ? "#fdecea" : "#e6f7ec";
  feedback.style.borderColor = esError ? "#f5c6c6" : "#cfead6";
  // Ocultar después de 4 segundos
  setTimeout(() => feedback.classList.add("hidden"), 4000);
}

// Validación extra por JS (además de HTML)
function validarCampos(data) {
  if (!data.firstName.trim() || !data.lastName.trim() || !data.name.trim()) {
    return "Por favor completa los nombres.";
  }
  // Email básico
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(data.email)) return "Introduce un correo válido.";
  if (!data.message.trim()) return "El mensaje no puede estar vacío.";
  return "";
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
    fecha: new Date().toISOString().split("T")[0]
  };

  const error = validarCampos(data);
  if (error) {
    mostrarFeedback(error, true);
    return;
  }

  guardarContacto(data);
  form.reset();
  mostrarFeedback("Mensaje enviado correctamente. ¡Gracias!", false);
});

limpiarBtn.addEventListener("click", () => {
  if (confirm("¿Deseas limpiar el formulario?")) {
    form.reset();
    mostrarFeedback("Formulario limpiado.", false);
  }
});
