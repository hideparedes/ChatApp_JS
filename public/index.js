const socket = io("http://localhost:3000");

document.getElementById("username-form").addEventListener("submit", event => {
  event.preventDefault();
  const username = document.getElementById("username");
  socket.emit("username", username.value);
});

//---------------------------------------------
const chatWindow = document.getElementById("chat-window");
const onlineList = document.getElementById("online-list");

socket.on("online", username => {
  checkUserStatus(username, "is connected");
  onlineUsers(username);
});

socket.on("display message", (message, user) => {
  addToChatWindow(message, user);
  console.log("display js " + user);
});

socket.on("user disconnected", username => {
  checkUserStatus(username, "is disconnected");
});

function checkUserStatus(name, status) {
  const messageCard = document.createElement("div");
  messageCard.classList.add("message-card", "from-others");
  messageCard.id = "message-card";
  const content = document.createElement("div");
  content.innerText = name + " " + status;
  content.classList.add("content");
  messageCard.append(content);
  chatWindow.append(messageCard);
}

function onlineUsers(name) {
  const user = document.createElement("div");
  user.innerText = name;
  user.id = "friends";
  onlineList.append(user);
}

const messageForm = document.getElementById("send-container");
const inputMessage = document.getElementById("input-message");

messageForm.addEventListener("submit", event => {
  event.preventDefault();
  const message = inputMessage.value;
  addYourMessage(message);
  socket.emit("send message", message);
  inputMessage.value = "";
});

function addYourMessage(message) {
  const messageCard = document.createElement("div");
  messageCard.classList.add("message-card", "from-you");
  const content = document.createElement("div");
  content.innerText = message;
  content.classList.add("content");
  messageCard.append(content);

  chatWindow.append(messageCard);
}

function addToChatWindow(message, user) {
  const messageCard = document.createElement("div");
  messageCard.classList.add("message-card", "from-others");
  const userName = document.createElement("p");
  userName.innerText = user;
  const content = document.createElement("div");
  content.innerText = message;
  content.classList.add("content");
  messageCard.append(userName);
  messageCard.append(content);

  chatWindow.append(messageCard);
}

const observer = new MutationObserver(scrollToBottom);

const config = {
  childList: true
};
observer.observe(chatWindow, config);

function scrollToBottom() {
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
