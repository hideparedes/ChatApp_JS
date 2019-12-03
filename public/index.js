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

function getCurrentTime() {
  const time = new Date();
  return `${time.getHours()}:${time.getMinutes()}`;
}


messageForm.addEventListener("submit", event => {
  event.preventDefault();
  const message = inputMessage.value;
  addYourMessage(message);
  socket.emit("send message", message);
  inputMessage.value = "";
});

socket.on("connected", name => {
  checkStatus(`${name} is connected`);
  addOnlineList(name);
});

socket.on("user disconnected", name => {
  checkStatus(`${name} has left the chat`);
  removeFromList(name);
});

socket.on("display message", (data, user) => {
  addToMessageList(data, user);
});


function checkStatus(user) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message-row", "other-message");

  const textElement = document.createElement('div');
  textElement.innerText = user;
  textElement.classList.add("message-text");
  messageElement.appendChild(textElement);

  const time = document.createElement('div');
  time.classList.add("message-time");
  time.innerText = getCurrentTime();
  messageElement.appendChild(time);

  messageList.append(messageElement)
}


function addYourMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message-row", "your-message");

  const textElement = document.createElement('div');
  textElement.innerText = message;
  textElement.classList.add("message-text");
  messageElement.appendChild(textElement);

  const time = document.createElement('div');
  time.classList.add("message-time");
  time.innerText = getCurrentTime();
  messageElement.appendChild(time);

  messageList.append(messageElement)
}

function addToMessageList(message, user) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message-row", "other-message");
  const name = document.createElement("div");
  name.innerHTML = user;
  messageElement.appendChild(name);
  const textElement = document.createElement('div');
  textElement.innerText = message;
  textElement.classList.add("message-text");
  messageElement.appendChild(textElement);

  const time = document.createElement('div');
  time.classList.add("message-time");
  time.innerText = getCurrentTime();
  messageElement.appendChild(time);
  messageList.append(messageElement)
}

const observer = new MutationObserver(scrollToBottom);

const config = {
  childList: true
};
observer.observe(messageList, config);

function scrollToBottom() {
  messageList.scrollTop = messageList.scrollHeight;
}


const onlineList = document.getElementById("online-list");


function addOnlineList(name) {
  const member = document.createElement("div");
  member.innerText = name;
  member.id = "members"
  onlineList.append(member);
}

function removeFromList(name) {
  const element = document.querySelectorAll("#members");


  element.forEach(user => {

    if (user.textContent === name) {
      user.remove();
    }
  });

}