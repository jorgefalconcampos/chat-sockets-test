const socket = io()  

socket.emit("message", "Mensaje del cliente")

// socket.on("evento-para-socket-individual", data => {
//     console.log(data);
// });


// socket.on("evento-para-todos-menos-para-el-socket-actual", data => {
//     console.log(data);
// });


// socket.on("evento-para-todos", data => {
//     console.log(data);

// });

const input = document.getElementById("textbox");

const log = document.getElementById("log");

input.addEventListener("keyup", event => {
    if (event.key === "Enter") {
        socket.emit("message2", input.value);
        input.value = "";
    }
});

socket.on("log", data => {
    let logs = "";
    data.logs.forEach(element => {
        logs += `<b>${element.socketId}</b> dice: ${element.message} <br/>`
    });
    log.innerHTML = logs;
})


let user;

Swal.fire({
    title: "Registro",
    text: "Escribe un nombre de usuario",
    icon: "success",
    input: "text",
    inputValidator: (value) => {
        return !value && "Necesitas escribir un nombre de usuario"
    },
    allowOutsideClick: false
}).then(resp => {
    user = resp.value;
    socket.emit("authenticated", user);
});

let chatBox = document.getElementById("chatbox");

const handleKeyUp = (evt) => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit("message", {user: user, message: chatBox.value});
            chatBox.value = "";
        }
    }
}

chatBox.addEventListener("keyup", handleKeyUp);

socket.on("messageLogs", arrayMensajeServidor => {
    let log = document.getElementById("messageLogs");
    let messages = "";
    arrayMensajeServidor.forEach(msj => {
        messages += `<li>Usuario: ${msj.user} dice ${msj.message}</li>`
    });

    log.innerHTML = messages;
})

socket.on("newUserConnected", data => {
    if (!user) return;
    Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        title: `${data} se unió al chat`,
        icon: "success"
    })
})