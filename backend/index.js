const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// logic
io.on("connection", (socket) => {
  console.log(`User is connected to ${socket.id}`);

  //to creating rooms
  socket.on("join_room", (data)=>{
    socket.join(data)
  })
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieved_message", data)
  })
  ////to creating publci chat
  // socket.on("send_message", (data) => {
  //   console.log(data);
  //   socket.broadcast.emit("recieved_message", data);
  // });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
