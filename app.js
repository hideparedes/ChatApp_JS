const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  res.redirect("/");
});



server.listen(3000, () => {
  console.log("listening on port 3000");
});


const users = {};

io.on("connection", client => {
  client.on("username", username => {
    users[client.id] = username;
    client.broadcast.emit("online", username);
  });

  client.on("send message", message => {

    const user = users[client.id];
    client.broadcast.emit("display message", message, user);
  });

  client.on("disconnect", () => {
    client.broadcast.emit("user disconnected", users[client.id]);
    delete users[client.id];
  })
})