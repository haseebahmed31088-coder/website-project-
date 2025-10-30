import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.static("public")); // if your index.html is inside a folder named 'public'

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join", (user) => {
    console.log(`${user} joined`);
    socket.broadcast.emit("chat message", { user: "System", text: `${user} joined the chat.` });
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3000, () => console.log("Secure chat running at http://localhost:3000"));
