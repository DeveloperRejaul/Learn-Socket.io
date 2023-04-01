module.exports = (io, socket) => {
  // ==============================================================
  // Reserved events
  // 1. connect
  // 2. connect_error
  // 3. disconnect
  // 4. newListener
  // 5. removeListener

  console.log("i am connection event ");
  // disconnect event
  socket.on("disconnect", () => {
    console.log("i am disconnect event");
  });

  // connect_error event
  socket.on("connect_error", () => {
    console.log("i am connect_error event");
  });
  // leashing data
  socket.on("clintEvent", (sms) => console.log(sms));
  // sending data , custom event
  socket.emit("customEvent", "I am custom event");

  /**=========================================================================================
   *                                    Emitting events
   *===========================================================================================*/
  // Basic Event
  socket.emit("hello", "world"); // we can send all type of data like , object, array, class, json etc

  // Acknowledgements
  // its look like request response system => eykane call back er maddome response patano jay
  socket.on("Acknowledgements", (data, callback) => {
    console.log(data);
    callback({
      status: "ok",
    });
  });

  // Volatile events

  // with out Volatile obostay => server restart hule loop ta teme jay , abar start hule => teme jaoya point teke abar soro huy
  // with Volatile obostay => server restart hule loop ta teme take na

  // socket.on("ping", (count) => {
  //   console.log(count);
  // });
};
