module.exports = (io, socket) => {
  // bilded event: connnnection,disconnected, connection_error
  console.log("a user connected");

  // ==============================================================================================
  //  recinv and send data here
  // custiom event: socket.on with reciving data
  socket.on("chat message", (msg) => {
    // custiom event: io.emit with sending data , sob doroner data patano jabe ey emit er maddome
    io.emit("recive_message", msg, { data: "rejsul" }, "kamal");
  });

  // ==============================================================================================
  // Socket Brotcusting:
  socket.on("chat message", (msg) => {
    // custiom event: io.emit with sending data
    socket.broadcast.emit("broadcasta_message", msg);
  });

  // ==============================================================================================
  // Socket rooming: one by one data communication , join room by id
  socket.on("send-message", (message, room) => {
    if (room === "") {
      socket.broadcast.emit("recive-message", message);
    } else {
      socket.to(room).emit("recive-message", message);
    }
  });

  // Socket rooming: join room by custom value
  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`Join ${room}`);
  });

  // ==============================================================================================
  // socket name spass
  const userIO = io.of("/user");
  userIO.on("connection", (socket) => {
    console.log("connected user with namespass", socket.username);
  });
  // using middelware
  userIO.use((socket, next) => {
    console.log(socket.handshake.auth.token);
    if (socket.handshake.auth.token) {
      socket.username = getUsernameFromToken(socket.handshake.auth.token);
      next();
    } else {
      next(new Error("Please send token"));
    }
  });

  function getUsernameFromToken(token) {
    return token;
  }

  // ==============================================================================================
  // socket connection and disconnection with prass key

  socket.on("ping", (num) => {
    console.log(num);
    io.emit("interval-data", num);
  });

  // ==============================================================================================
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
};
