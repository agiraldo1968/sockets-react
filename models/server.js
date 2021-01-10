const express  = require('express');
// Servidor de Sockets
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const Sockets  = require('./sockets');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer(this.app);

        // Configuración de servidor de socket
        this.io = socketio(this.server);
    }

    middlewares() {
        // Desplegar directorio público
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }

    configurarSockets() {
        new Sockets(this.io);
    }

    execute() {
        this.middlewares();
        this.configurarSockets();

        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port);
        });
    }
}

module.exports = Server;