var socket = io("/chat");

socket.on("connect", () => {
  console.log("chat name spaces");
  const h4 = document.getElementById("title");
  h4.textContent = `You are connected chat namespaces  `;
});
