const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const inputMessage = document.getElementById("input-message");

const name = prompt("Enter your username");
socket.emit("new user", name);

socket.on("connecter", name => {
  addToChat(`${name} is connected`);
});

socket.on("user disconnected", name => {
  addToChat(`${name} has left the chat`);
});

messageForm.addEventListener("submit", event => {
  event.preventDefault();
  const message = inputMessage.value;
  addToChat(`You: ${message}`);
  socket.emit("send message", message);
  inputMessage.value = "";
});

socket.on("display message", data => {
  addToChat(data);
});

function addToChat(message) {
  const messageElement = document.createElement("P");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
