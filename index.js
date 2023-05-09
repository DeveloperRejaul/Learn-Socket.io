const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const onConnectionAllInOne = require("./Socket/onConnectionAllInOne.js");
const handleEvent = require("./Socket/learn-stape-by-stape/02HandleEvent.js");
const createNameSpaces = require("./Socket/learn-stape-by-stape/01CreatingNameSpasse.js");
const rooming = require("./Socket/learn-stape-by-stape/03rooming.js");
const oneByOneChat = require("./Socket/learn-stape-by-stape/oneByOneChat.js");

const io = new Server(server);

app.use(express.static("client"));
// ===========================================================================================
// 01 for create namespaces
app.get("/chat", (req, res) =>
  res.sendFile(
    __dirname + "/client/learn-stape-by-stape/01nameSpassce/namespasses01.html"
  )
);

// =============================================================================================
// 02 event
// connection for server side event
// connect for client side event
app.get("/event", (req, res) =>
  res.sendFile(__dirname + "/client/learn-stape-by-stape/02event/event.html")
);

// =============================================================================================
// 03 rooming
app.get("/room", (req, res) =>
  res.sendFile(
    __dirname + "/client/learn-stape-by-stape/03rooming/rooming.html"
  )
);

// =============================================================================================
// 03 for one by one chat
app.get("/onebyonechat", (req, res) =>
  res.sendFile(
    __dirname + "/client/learn-stape-by-stape/04OneByOneChat/index.html"
  )
);

// =============================================================================================
// default route  and all in one roue
// app.get("/user", (req, res) => res.sendFile(__dirname + "/index.html"));
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

// ===========================================================================================
// all of socket code
// ===========================================================================================
io.on("connection", (socket) => onConnectionAllInOne(io, socket));

// 01 create  chat namespace
const chatIO = io.of("/chat");
chatIO.on("connection", (socket) => createNameSpaces(chatIO, socket));

// 02 handle event
const eventIO = io.of("/event");
eventIO.on("connection", (socket) => handleEvent(eventIO, socket));

// 03 rooming functionality
const roomIO = io.of("/room");
roomIO.on("connection", (socket) => rooming(eventIO, socket));

// 03 rooming functionality
const oneByOneIO = io.of("/onebyonechat");
roomIO.on("connection", (socket) => oneByOneChat(oneByOneIO, socket));

server.listen(3000, () => {
  console.log("listening on *:3000");
});
