const express = require("express");

const { usersRouter } = require("./routes/users.router");
const { productosRouter } = require("./routes/productos.router");
const { viewsRouter } = require("./routes/views.router");

const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 8080;


const mid2 = (req, res, next)=>{
    req.dato2 = 'dato 2'
    next()
}


// handlebars config
const handlebars = require("express-handlebars");

app.engine('handlebars', handlebars.engine())
app.set('view engine','handlebars');
app.set('views', __dirname + '/views')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use("/static", express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public"));

app.use("/vista", viewsRouter);

app.use("/api/usuarios", usersRouter);
app.use("/api/productos", mid2, productosRouter);


app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Todo mal");
})


const httpServer = app.listen(PORT, (err) => {
    if (err) return console.log("Error al iniciar el server");
    console.log("Servidor de ChatApp corriendo en: " + PORT);
});

const socketServer = new Server(httpServer);
const logs = [];

socketServer.on("connection", socket => {
    console.log((`Cliente conectado:`));
    socket.on("message", dataClient => {
        console.log(dataClient);

    });

    socket.on("message2", data => {
        logs.push({socketId: socket.id, message: data});
        socketServer.emit("log", {logs});
    })

});

const io = new Server(httpServer);
const messages = [];

io.on("connection", socket => {
    console.log("Nuevo cliente conectado");
    socket.on("message", objetoMensajeCliente => {
        messages.push(objetoMensajeCliente);
        io.emit("messageLogs", messages);
    });

    socket.on("authenticated", nombreUsuario => {
        socket.broadcast.emit("newUserConnected", nombreUsuario);
    })
}) 


