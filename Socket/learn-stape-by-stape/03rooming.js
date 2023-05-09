module.exports = (io, socket) => {
  console.log("i am connected " + socket.id);

  // =========================================================================
  // joining room customary
  // leasing join room event
  // socket.on("join-room", (room, cb) => {
  //   socket.join(room);
  //   cb(`Join ${room}`); // ey client side e , socket.emit("join-room", (message)=> message === `Join ${room}`) hube
  // });

  // var count = 1;
  // setInterval(() => {
  //   count++;
  // socket.to("room1").emit("receiveMessage", `hello people${count}`);
  // socket.broadcast.emit("receiveMessage", "msg");
  // }, 2000);

  // =========================================================================
  // joining room button click and same room multiple popple convection
  socket.on("createRoom", (roomName, callBack) => {
    socket.join(roomName);
    callBack(`you joined ${roomName}`);
  });

  // chatting in joined room
  socket.on("messageSend", (roomName, message) => {
    // send message in spastic room
    socket.to(roomName).emit("messageResive", message);
    // socket.broadcast.emit("messageResive", message); // broadcast send data to all user in namespace
  });
};
