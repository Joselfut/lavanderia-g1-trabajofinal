document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-reserva");
  const servicioSelect = document.getElementById("servicio");
  const cantidadInput = document.getElementById("cantidad");
  const modalidadSelect = document.getElementById("modalidad");
  const expressCheckbox = document.getElementById("express");
  const totalEstimadoEl = document.getElementById("total-estimado");
  const resultadoEl = document.getElementById("resultado-envio");

  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.querySelector(".nav");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  function calcularEstimado() {
    const opcionServicio = servicioSelect.options[servicioSelect.selectedIndex];
    const opcionModalidad = modalidadSelect.options[modalidadSelect.selectedIndex];

    const precioBase = Number(opcionServicio?.dataset?.precio || 0);
    const cantidad = Math.max(0, Number(cantidadInput.value || 0));

    if (precioBase <= 0 || cantidad <= 0) {
      totalEstimadoEl.textContent = "RD$ 0";
      return 0;
    }

    let subtotalServicio = precioBase * cantidad;

    if (expressCheckbox && expressCheckbox.checked) {
      subtotalServicio = subtotalServicio * 1.25;
    }

    const tarifaDomicilioBase = Number(opcionModalidad?.dataset?.domicilio || 0);
    const costoDomicilio =
      tarifaDomicilioBase > 0 && subtotalServicio < 500
        ? tarifaDomicilioBase
        : 0;

    const total = Math.round(subtotalServicio + costoDomicilio);
    totalEstimadoEl.textContent = `RD$ ${total.toLocaleString("es-DO")}`;
    return total;
  }

  function generarNumeroOrden() {
    const numero = Math.floor(1000 + Math.random() * 9000);
    return `G1-${numero}`;
  }

  [servicioSelect, cantidadInput, modalidadSelect, expressCheckbox].forEach((campo) => {
    if (campo) {
      campo.addEventListener("input", calcularEstimado);
      campo.addEventListener("change", calcularEstimado);
    }
  });

  calcularEstimado();

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const correo =
        document.getElementById("correo").value.trim() || "No especificado";
      const servicioTexto =
        servicioSelect.options[servicioSelect.selectedIndex]?.text || "";
      const cantidad = Number(cantidadInput.value || 0);
      const modalidadTexto = modalidadSelect.value;
      const esExpress = expressCheckbox && expressCheckbox.checked ? "Sí (+25%)" : "No";
      const fecha = document.getElementById("fecha").value;
      const notas =
        document.getElementById("notas").value.trim() || "Sin notas adicionales";

      if (!nombre || !telefono || !servicioSelect.value || cantidad < 1 || !fecha) {
        resultadoEl.className = "resultado-envio error";
        resultadoEl.innerHTML =
          "<strong>Por favor completa todos los campos obligatorios (*).</strong>";
        return;
      }

      const total = calcularEstimado();
      const orden = generarNumeroOrden();

      resultadoEl.className = "resultado-envio exito";
      resultadoEl.innerHTML = `
        <p><strong>✓ ¡Solicitud registrada en Lavandería G1!</strong></p>
        <p><strong>Número de Orden:</strong> ${orden}</p>
        <p><strong>Cliente:</strong> ${nombre} (${telefono})</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Servicio:</strong> ${servicioTexto} (${cantidad} unidades/libras)</p>
        <p><strong>Express 24h:</strong> ${esExpress}</p>
        <p><strong>Modalidad:</strong> ${modalidadTexto} — <strong>Fecha:</strong> ${fecha}</p>
        <p><strong>Notas / Dirección:</strong> ${notas}</p>
        <p><strong>Total Estimado:</strong> RD$ ${total.toLocaleString("es-DO")}</p>
      `;
    });
  }
});
