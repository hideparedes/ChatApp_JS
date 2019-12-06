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


// app.get("/", (req, res) => {
//   res.render("home");
// });

const rooms = {}

// Testing--------------------------------------------
app.get("/", (req, res) => {
  res.render("login", {
    rooms: rooms
  })
});

app.post("/room", (req, res) => {
  const roomName = req.body.room;

  if (rooms[roomName] != null) {
    return res.redirect("/");
  }

  rooms[roomName] = {
    users: {}
  };

  res.redirect(`/${roomName}`);
  console.log(rooms);
  
});

app.get("/:id", (req, res) => {
  const roomName = req.params.id;

  if (rooms[roomName] == null) {
    return res.redirect("/");
  }

  res.render("test", {
    roomName: roomName
  });
});


server.listen(3000, () => {
  console.log("Listening on port 3000");
});

//-------------------------------------------------
const users = {};

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