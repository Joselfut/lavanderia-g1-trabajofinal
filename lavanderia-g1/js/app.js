/* =========================================================
  const formulario = document.getElementById("formulario");

const servicio = document.getElementById("servicio");
const cantidad = document.getElementById("cantidad");
const modalidad = document.getElementById("modalidad");
const total = document.getElementById("total");
const mensaje = document.getElementById("mensaje");

// Tarifas de ejemplo en pesos dominicanos por libra o pieza.
// Puedes cambiar estos precios según tu lavandería.
const tarifas = {
    lavado: 75,
    secado: 50,
    planchado: 60,
    completo: 120,
    especial: 150
};

// Calcular precio estimado
function calcularPrecio() {

    const tipo = servicio.value;
    const unidades = Number(cantidad.value);

    if (!tipo || unidades <= 0) {
        total.textContent = "RD$ 0.00";
        return;
    }

    const precio = tarifas[tipo] * unidades;

    total.textContent = "RD$ " + precio.toFixed(2);
}

// Actualizar el precio al cambiar los datos
servicio.addEventListener("change", calcularPrecio);
cantidad.addEventListener("input", calcularPrecio);

// Evitar fechas anteriores al día actual
const fecha = document.getElementById("fecha");

const hoy = new Date();
const fechaLocal = new Date(
    hoy.getTime() - hoy.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

fecha.min = fechaLocal;

// Guardar solicitud
formulario.addEventListener("submit", function(e) {

    e.preventDefault();

    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
    }

    const datos = {
        nombre: document.getElementById("nombre").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value,
        servicio: servicio.value,
        cantidad: cantidad.value,
        modalidad: modalidad.value,
        fecha: fecha.value,
        direccion: document.getElementById("direccion").value,
        precioEstimado: total.textContent
    };

    let solicitudes = JSON.parse(
        localStorage.getItem("solicitudesLavanderia") || "[]"
    );

    solicitudes.push(datos);

    localStorage.setItem(
        "solicitudesLavanderia",
        JSON.stringify(solicitudes)
    );

    mensaje.textContent =
        "¡Solicitud registrada correctamente! Gracias por elegirnos.";

    formulario.reset();
    total.textContent = "RD$ 0.00";

});

// Limpiar el mensaje al reiniciar
formulario.addEventListener("reset", function() {
    mensaje.textContent = "";
    total.textContent = "RD$ 0.00";
}); LAVANDERÍA G1 - LÓGICA E INTERACTIVIDAD (JavaScript)
   ========================================================= */

