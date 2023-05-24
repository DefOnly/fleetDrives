import express from "express";
import http from "http";
import cors from "cors";
import { PORT } from "./configPort.js";
import { Server as SocketServer } from "socket.io";

const app = express();
const server = http.createServer(app);
const ioConnect = new SocketServer(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});
app.use(cors());
let onlineUsers = [];
const addNewUser = (username, socketId) => {
    !onlineUsers.some(user => user.username === username) && 
    onlineUsers.push({username, socketId});
};
const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
};
const getUser = (username) => {
    return onlineUsers.find(user => user.username === username);
}
ioConnect.on("connection", (socket) => {
    socket.on("newUser", (username) => {
        addNewUser(username, socket.id)
    })

    socket.on("sendNotification", ({senderName, receiverId}) => {
        const receiver = getUser(receiverId);
        ioConnect.to(receiver.socketId).emit("getNotification", {senderName})
    })
    // console.log(socket.id);
    // console.log("CONECTADO EL SOCKET");
    socket.on("disconnect", () => {
        removeUser(socket.id)
        // console.log("DESCONECTADO EL SOCKET");
    });
});
server.listen(PORT, () => {
    console.log("Puerto 4000 disponible");
});
