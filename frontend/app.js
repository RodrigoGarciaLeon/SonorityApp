const ws = new WebSocket("ws://127.0.0.1:8082");

ws.onopen = () => {
    console.log("Conectado al servidor WebSocket");
};

ws.onmessage = (event) => {
    console.log("Mensaje recibido:", event.data);

    // Mostrar el resultado en el elemento con ID 'codec-result'
    document.getElementById("codec-result").textContent = event.data;
};

ws.onclose = () => {
    console.log("Conexión cerrada");
};

ws.onerror = (error) => {
    console.error("Error en WebSocket:", error);
};

function sendNetworkDelay() {
    const networkDelayInput = document.getElementById("network_delay").value;

    // Verificar que el WebSocket está abierto antes de enviar el mensaje
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(networkDelayInput);
    } else {
        console.error("WebSocket no está conectado");
    }
}
