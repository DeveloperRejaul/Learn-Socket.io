module.exports = (io, socket) => {
  console.log("i am connection event ");

  // sending data , custom event
  socket.emit("customEvent", "I am custom event");

  // leashing data
  socket.on("clintEvent", (sms) => console.log(sms));

  socket.on("disconnect", () => {
    console.log("i am disconnect event");
  });
};
