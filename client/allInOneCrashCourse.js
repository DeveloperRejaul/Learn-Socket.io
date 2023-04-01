var socket = io();

// connect with name spass
// var userSocket = io("/user", {
//   auth: { token: "Test" },
// });

var messages = document.getElementById("messages");
var form = document.getElementById("form");
var input = document.getElementById("input");
var room = document.getElementById("room");
var joinBTN = document.getElementById("join");
var h5 = document.getElementById("h5");

const showMessage = (msg) => {
  var item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
};
const setSmg = (smg) => {
  h5.textContent = smg;
};

// ====================================================================================
// sowing connect by id
socket.on("connect", () => {
  const h4 = document.getElementById("title");
  h4.textContent = `You connect by ${socket.id} id `;
});

// ====================================================================================
// sending data with emit mathod , handle all of functionality
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const messageValue = input.value;
  const roomValue = room.value;

  if (messageValue === "") return;
  showMessage(messageValue);
  socket.emit("send-message", messageValue, roomValue);

  input.value = "";
});

// ====================================================================================
// reciving data with "on" mathod
// socket.on("recive_message", (msg) => showMessage(msg));

// ====================================================================================
// reciving broadcast data
// socket.on("broadcasta_message", (message) => {
//   console.log(message);
// });

// ====================================================================================
// rooming in socket
joinBTN.addEventListener("click", () => {
  const roomValue = room.value;
  socket.emit("join-room", roomValue, (messages) => {
    showMessage(messages);
  });
});

socket.on("recive-message", (smg) => {
  showMessage(smg);
});

// =======================================================================================
// difult Error event
// userSocket.on("connect_error", (error) => {
//   showMessage(error);
// });

// =======================================================================================
// disconnect and connect with key lisenting

let count = 0;
setInterval(() => {
  // volatile dile loop ta disconnect kurle off take
  // socket.volatile.emit("ping", ++count);
  // volatile na dile loop ta disconnect kurleo salo take take
  // socket.emit("ping", ++count);
}, 1000);

// recive interval data
socket.on("interval-data", async (data) => await setSmg(`number: ${data}`));

document.addEventListener("keydown", (e) => {
  if (e.target.matches("input")) return;
  if (e.key === "c") socket.connect();
  if (e.key === "d") socket.disconnect();
});
