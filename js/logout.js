document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnCerrar");
  if (!btn) return;

  btn.addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
    if (window.location.pathname.includes("/html/")) {
      window.location.replace("login.html");
    } else {
      window.location.replace("html/login.html");
    }
  });
});
