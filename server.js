// server.js

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const path = require('path');

const app = express();

// Ruta al archivo JSON de cookies
const cookiesFilePath = path.join(__dirname, 'cookies.json');

// Lee las cookies del archivo JSON
let cookies = {};
try {
    cookies = JSON.parse(fs.readFileSync(cookiesFilePath, 'utf8'));
} catch (error) {
    console.error('Error al leer el archivo de cookies JSON:', error);
}

// Configuración del middleware de proxy
app.use('/', createProxyMiddleware({
    target: 'https://es.semrush.com', // URL del sitio destino
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        // Construir la cadena de cookies
        const cookieHeader = Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ');
        // Establecer las cookies en el encabezado de la solicitud proxy
        proxyReq.setHeader('Cookie', cookieHeader);
    },
}));

// Iniciar el servidor
const PORT = process.env.PORT || 3000; // Usa el puerto proporcionado por Heroku o, en su defecto, el puerto 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
