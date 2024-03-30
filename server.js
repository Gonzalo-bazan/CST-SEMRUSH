require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const sequelize = require('./config/dbConfig');
const Herramienta = require('./models/Herramienta');

const app = express();

async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

// Middleware personalizado para leer cookies de la base de datos
async function leerCookies(req, res, next) {
    try {
        const herramienta = await Herramienta.findOne({ where: { id: 2 } });
        if (herramienta) {
            const cookiesCadena = herramienta.cookies;
            req.cookiesDB = cookiesCadena.split('; ').reduce((acumulador, cookie) => {
                const [clave, valor] = cookie.split('=');
                acumulador[clave] = valor;
                return acumulador;
            }, {});
        }
    } catch (error) {
        console.error('Error al obtener cookies:', error);
        req.cookiesDB = {};
    }
    next();
}

app.use(leerCookies); // Usa el middleware personalizado

app.use('/', createProxyMiddleware({
    target: 'https://es.semrush.com',
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        if (req.cookiesDB) {
            const cookieHeader = Object.entries(req.cookiesDB).map(([key, value]) => `${key}=${value}`).join('; ');
            proxyReq.setHeader('Cookie', cookieHeader);
        }
    },
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

connectToDatabase();
