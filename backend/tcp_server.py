import asyncio
import websockets
import math

async def handler(websocket):
    print(f"Cliente conectado: {websocket.remote_address}")
    try:
        while True:
            message = await websocket.recv()
            print(f"Mensaje recibido: {message}")

            # Convertir el mensaje a entero y calcular la raíz cuadrada
            try:
                value = int(message)
                result = math.sqrt(value)
                response = f"{result:.2f}"  # Formatear el resultado a 2 decimales
            except ValueError:
                response = "Error: Entrada no válida"

            # Enviar la respuesta de vuelta al cliente
            await websocket.send(response)
    except websockets.ConnectionClosed:
        print("Cliente desconectado")

async def main():
    server = await websockets.serve(handler, "127.0.0.1", 8082)
    print("Servidor WebSocket iniciado en ws://127.0.0.1:8082")
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())
