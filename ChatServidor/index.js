const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");

const app = express();

const allowedOrigins = ['http://localhost:4200', 'http://192.168.209.40:4200'];
app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"]
    }
});

// Resto de tu código...


// Ruta básica (opcional)
app.get('/', (req, res) => {
    res.send("Backend funcionando");
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('Chat message: ' + msg);
        io.emit('chat message', msg);
    });
});

// Cambia localhost por 0.0.0.0 para escuchar en todas las interfaces de red
server.listen(4000, '0.0.0.0', () => {
    console.log("Listening on port 4000");
});
