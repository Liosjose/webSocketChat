const express = require('express')
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Contenedor = require('./filesystem')
let nuevo = new Contenedor('./texto.txt')





let productos = [];

let message = []

app.use(express.static('public'));


io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('productos', productos);
    socket.emit('message', message) // emitir todos los mensajes a un cliente nuevo
    

    socket.on('new-productos', function(data) {
        productos.unshift(data); // agregar mensajes a array 
        io.sockets.emit('productos', productos); //emitir a todos los clientes

        
    }); 
    
    socket.on('new-message', function(data) {
        nuevo.save(data)
        message.unshift(data); // agregar mensajes a array 
        io.sockets.emit('messages', message); //emitir a todos los clientes
    }); 
});


const PORT = process.env.PORT || 8080;

const srv = server.listen(PORT, () => { 
    console.log(`Servidor Http con Websockets escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en servidor ${error}`))