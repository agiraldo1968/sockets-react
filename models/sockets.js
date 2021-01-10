class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', (socket) => {
            socket.on('mensaje-to-server', (datos) => {
                console.log(datos);
                this.io.emit('mensaje-from-server', datos);
            })
        });
    }
}

module.exports = Sockets;