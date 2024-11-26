// Establecer la conexión WebSocket
const ws = new WebSocket("ws://127.0.0.1:8082");

ws.onopen = () => {
  console.log("Conectado al servidor WebSocket");
};

ws.onmessage = (event) => {
  console.log("Mensaje recibido:", event.data);
};

ws.onclose = () => {
  console.log("Conexión cerrada");
};

ws.onerror = (error) => {
  console.error("Error en WebSocket:", error);
};

// Función para enviar los parámetros al servidor WebSocket
function sendNetworkParameters(event) {
  event.preventDefault();
  // Recoger los valores de los inputs
  const MOS_pedido = document.getElementById("quality").value; // Calidad de llamada
  const Retardo_red = document.getElementById("network_delay").value; // Retardo de red
  const jitter = document.getElementById("jitter").value; // Jitter
  const NC = document.getElementById("client_number").value; // Número de clientes
  const Nl = document.getElementById("lines_per_client").value; // Líneas por cliente
  const Tpll = document.getElementById("call_time").value; // Tiempo promedio de llamada
  const Pb = document.getElementById("price_per_mbps").value; // Precio por Mbps
  const Bwst_pedido = document.getElementById("max_budget").value; // Máximo precio a pagar
  const enlace = document.getElementById("header").value; // Cabecera (RTP o cRTP)

  // Formar el string en el formato solicitado
  const parametersString = `1|${MOS_pedido}|${Retardo_red}|${Retardo_red}|${jitter}|${NC}|${Nl}|${Tpll}|${Pb}|${Bwst_pedido}|0|${enlace}|${enlace === "1" ? "cRTP" : "RTP"}`;

  // Verificar que el WebSocket está abierto antes de enviar el mensaje
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(parametersString); // Enviar el string al servidor
    console.log("Enviado al servidor:", parametersString);
  } else {
    console.error("WebSocket no está conectado");
  }
}



// Funcion para enviar el informe por correo electronico
function sendEmail(event){
  event.preventDefault() // Para no recargar la página y que no se borren los datos
  // Recogemos el valor del correo electronico
  const email = document.getElementById("email").value; //nombre del correo

  // Formar el string en el formato solicitado
  const emailString = `2|${email}`;

  // Verificar si el Websocket está abierto antes de enviar el mensaje
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(emailString); // Enviar el string al servidor
    console.log("Enviado al servidor:", emailString);
  } else {
    console.error("Websocket no está conectado");
  }
}



// Función para añadir un nuevo codec por parte del usuario
function sendNewCodec(event) {
  event.preventDefault()
  // Recoger los valores de los inputs
  const nombre = document.getElementById("codec-name").value; // Nombre del códec
  const CBR = document.getElementById("bitrate").value; // Bitrate (kbps)
  const CSS = document.getElementById("sample-rate").value; // Sample Rate (Hz)
  const CSI = document.getElementById("csi").value; // CSI
  const MOS = document.getElementById("mos").value; // MOS
  const VPS_B = document.getElementById("vps-bytes").value; // VPS (Bytes)
  const VPS_ms = document.getElementById("vps-ms").value; // VPS (ms)

  // Formar el string en el formato solicitado
  const codecString = `3|${nombre}|${CBR}|${CSS}|${CSI}|${MOS}|${VPS_B}|${VPS_ms}`;

  // Verificar que el WebSocket está abierto antes de enviar el mensaje
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(codecString); // Enviar el string al servidor
    console.log("Enviado al servidor:", codecString);
  } else {
    console.error("WebSocket no está conectado");
  }
}



// // Establecer la conexión WebSocket
// const ws = new WebSocket("ws://127.0.0.1:8082");

// ws.onopen = () => {
//   console.log("Conectado al servidor WebSocket");
// };

// ws.onmessage = (event) => {
//   console.log("Mensaje recibido:", event.data);

//   // Mostrar el resultado de la raíz cuadrada en el elemento con id 'total-delay-result'
//   document.getElementById("total-delay-result").textContent = event.data + " ms";
// };

// ws.onclose = () => {
//   console.log("Conexión cerrada");
// };

// ws.onerror = (error) => {
//   console.error("Error en WebSocket:", error);
// };

// // Función para enviar el retardo de red al servidor WebSocket
// function sendNetworkDelay() {
//   const networkDelayInput = document.getElementById("network_delay").value;

//   // Verificar que el WebSocket está abierto antes de enviar el mensaje
//   if (ws.readyState === WebSocket.OPEN) {
//     ws.send(networkDelayInput);  // Enviar el valor del retardo de red
//     console.log("Enviado al servidor:", networkDelayInput);
//   } else {
//     console.error("WebSocket no está conectado");
//   }
// }
