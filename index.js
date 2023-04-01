const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const onConnection = require("./Socket/onConnection.js");
const io = new Server(server);

// for name spass
// app.get("/user", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => onConnection(io, socket));

server.listen(3000, () => {
  console.log("listening on *:3000");
});
