const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.set("view engine", "ejs");
app.use(express.static("public"));



app.get("/", (req, res) => {
  res.render("home");
});

io.on("connection", socket => {
  socket.on('send message', message => {
    socket.broadcast.emit('display message', message)

  });
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});