const socket = io("http://localhost:3000");
const messageList = document.getElementById("message-list");
const messageForm = document.getElementById("send-container");
const inputMessage = document.getElementById("input-message");
const usernameInput = document.getElementById('usernameInput');
const btn = document.getElementById("username-btn");


btn.addEventListener('click', (event) => {
  event.preventDefault();
  const name = usernameInput.value;
  socket.emit('user name', name);
});



messageForm.addEventListener("submit", event => {
  event.preventDefault();
  const message = inputMessage.value;
  addYourMessage(message);
  socket.emit("send message", message);
  inputMessage.value = "";
});

socket.on("connected", name => {
  addToMessageList(`${name} is connected`);
});

socket.on("user disconnected", name => {
  addToMessageList(`${name} has left the chat`);
});

socket.on("display message", data => {
  addToMessageList(data);


});


function addYourMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message-row", "your-message");

  const textElement = document.createElement('div');
  textElement.innerText = message;
  textElement.classList.add("message-text");
  messageElement.appendChild(textElement);

  const time = document.createElement('div');
  time.classList.add("message-time");
  time.innerText = "14:32";
  messageElement.appendChild(time);

  messageList.append(messageElement)
}

function addToMessageList(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message-row", "other-message");

  const textElement = document.createElement('div');
  textElement.innerText = message;
  textElement.classList.add("message-text");
  messageElement.appendChild(textElement);

  const time = document.createElement('div');
  time.classList.add("message-time");
  time.innerText = "14:32";
  messageElement.appendChild(time);
  messageList.append(messageElement)


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