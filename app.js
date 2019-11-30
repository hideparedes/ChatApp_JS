const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

const today = new Date();
const options = {
  weekday: "long",
  month: "long",
  day: "numeric"
};

const users = {};

app.get("/", (req, res) => {
  res.render("home", {
    date: today.toLocaleDateString("en-US", options)
  });
});

io.on("connection", socket => {
  socket.on('user name', name => {
    users[socket.id] = name;
    socket.broadcast.emit('connected', name);

  })

  socket.on("send message", message => {
    socket.broadcast.emit("display message", message);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user disconnected", users[socket.id]);
    delete users[socket.id];
  });
});


server.listen(3000, () => {
  console.log("Listening on port 3000");
});