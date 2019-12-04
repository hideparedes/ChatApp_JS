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



const users = {};

app.get("/", (req, res) => {
  res.render("home");
});

io.on("connection", socket => {
  socket.on('user name', name => {
    users[socket.id] = name;
    socket.broadcast.emit('connected', name);

  })

  socket.on("send message", message => {

    const user = users[socket.id];
    socket.broadcast.emit("display message", message, user)
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user disconnected", users[socket.id]);
    delete users[socket.id];
  });
});


const rooms = {
  Martin: {}
}

app.get("/room/:roomName", (req, res) => {
  res.render("room", {
    rooms: rooms,
    roomName: req.params.roomName
  });
})

app.post("/room", (req, res) => {
  const roomName = req.body.room;

  res.redirect(`/room/${roomName}`);
});

// Test--------------------------------------------
app.get("/test", (req, res) => {
  res.render("test", {
    rooms: rooms
  })
});

//-------------------------------------------------
server.listen(3000, () => {
  console.log("Listening on port 3000");
});