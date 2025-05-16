const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const mqtt = require("mqtt");
const path = require("path");


// Express y servidor HTTP
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// MQTT client conectado al broker
const mqttClient = mqtt.connect("mqtt://broker.hivemq.com:1883");

mqttClient.on("connect", () => {
  console.log("Conectado al broker MQTT");
});

// Cuando el navegador se conecta vía WebSocket
wss.on("connection", (ws) => {
  console.log("Cliente WebSocket conectado");

  ws.on("message", (msg) => {
    console.log("Comando recibido:", msg.toString());
    mqttClient.publish("esp32/control", msg.toString());
  });
});

// Servir archivos estáticos
app.use(express.static("public"));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Escuchando en ${PORT}`);
});
