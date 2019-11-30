const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const inputMessage = document.getElementById("input-message");
const usernameInput = document.getElementById('usernameInput');
const btn = document.getElementById("username-btn");
// const name = prompt("Enter your username");
// socket.emit("new user", name);

btn.addEventListener('click', (event) => {
  event.preventDefault();
  const name = usernameInput.value;
  socket.emit('user name', name);
});



messageForm.addEventListener("submit", event => {
  event.preventDefault();
  const message = inputMessage.value;
  addToChat(`You: ${message}`);
  socket.emit("send message", message);
  inputMessage.value = "";
});

socket.on("connected", name => {
  addToChat(`${name} is connected`);
});

socket.on("user disconnected", name => {
  addToChat(`${name} has left the chat`);
});

socket.on("display message", data => {
  addToChat(data);
});

function addToChat(message) {
  const messageElement = document.createElement("P");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}



// const name = usernameInput.getAttribute('value');

// usernameInput.addEventListener('keydown', event => {
//   if (event.which == 13) {

//     console.log(name);

//     // if (name) {
//     //   socket.emit('user', name);
//     // }

//   }
// })