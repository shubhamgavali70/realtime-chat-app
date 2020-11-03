const socket = io("https://desolate-hollows-62691.herokuapp.com/");

const user = prompt("Enter your name");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const msgInp = document.getElementById("messageInp");
const form = document.getElementById("formTag");
const chatBox = document.querySelector(".chatbox");
window.addEventListener("load", () => {
  msgInp.value = "";
});
const greet = document.querySelector(".greet");
greet.innerText = `Welcome ${user}`;

function appendMsg(data, position, name, text) {
  const msg = document.createElement("div");
  msg.classList.add(position);
  // msg.innerText = `${data.user}: ${data.message}`;
  const leftName = document.createElement("div");
  const leftText = document.createElement("div");
  leftText.classList.add(text);
  leftName.classList.add(name);
  leftName.innerText = data.user;
  leftText.innerText = data.message;
  msg.appendChild(leftName);
  msg.appendChild(leftText);
  chatBox.appendChild(msg);
}

socket.emit("new-user", user);
socket.on("user-joined", (user) => {
  const msg = document.createElement("div");
  msg.classList.add("left");
  const leftText = document.createElement("div");
  leftText.classList.add("left-text");

  leftText.innerText = `${user} has joined the chat`;
  msg.appendChild(leftText);
  chatBox.appendChild(msg);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = document.createElement("div");
  msg.classList.add("right");
  //   msg.innerText = `You: ${msgInp.value}`;
  const leftName = document.createElement("div");
  const leftText = document.createElement("div");
  leftText.classList.add("right-text");
  leftName.classList.add("right-name");
  leftName.innerText = "You";
  leftText.innerText = msgInp.value;
  msg.appendChild(leftName);
  msg.appendChild(leftText);
  chatBox.appendChild(msg);
  socket.emit("sendMessage", msgInp.value);
  msgInp.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
});
socket.on("new-message", (data) => {
  appendMsg(data, "left", "left-name", "left-text");
});
socket.on("leave", (user) => {
  const msg = document.createElement("div");
  msg.classList.add("left");

  const leftText = document.createElement("div");
  leftText.classList.add("left-text");

  leftText.innerText = `${user} left the chat`;
  msg.appendChild(leftText);
  chatBox.appendChild(msg);
});
