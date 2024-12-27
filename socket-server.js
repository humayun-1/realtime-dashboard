import { Server } from "socket.io";
import { URLs } from "./app/utils/constants/index.js";

const io = new Server(3001, {
  cors: {
    origin: URLs.BASE_URL,
    methods: ["GET", "POST"],
    credentials: true
  },
});

io.on("connection", (socket) => {
  socket.on("connection", (data) => {
    console.log("client connected" + data.id);
  });

  socket.on("get-stats", async () => {
    const data = await fetch(URLs.API + "/stats");
    const response = await data.json();
    socket.emit("stats", response);
  });
  
  socket.on("get-inventory", async () => {
    const data = await fetch(URLs.API + "/inventory");
    const response = await data.json();
    socket.emit("inventory", response)
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

console.log("Socket running ...")