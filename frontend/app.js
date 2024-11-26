
// Establecer la conexión WebSocket
const ws = new WebSocket("ws://127.0.0.1:8082");

ws.onopen = () => {
  console.log("Conectado al servidor WebSocket");
};

ws.onmessage = (event) => {
  console.log("Mensaje recibido:", event.data);

  // Mostrar el resultado de la raíz cuadrada en el elemento con id 'total-delay-result'
  document.getElementById("total-delay-result").textContent = event.data + " ms";
};

ws.onclose = () => {
  console.log("Conexión cerrada");
};

ws.onerror = (error) => {
  console.error("Error en WebSocket:", error);
};

// Función para enviar el retardo de red al servidor WebSocket
function sendNetworkDelay() {
  const networkDelayInput = document.getElementById("network_delay").value;

  // Verificar que el WebSocket está abierto antes de enviar el mensaje
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(networkDelayInput);  // Enviar el valor del retardo de red
    console.log("Enviado al servidor:", networkDelayInput);
  } else {
    console.error("WebSocket no está conectado");
  }
}
