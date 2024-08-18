import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Define the type for the userSocketMap
interface UserSocketMap {
  [userId: string]: string;
}

const userSocketMap: UserSocketMap = {}; // {userId: socketId}

export const getReceiverSocketId = (receiverId: string): string | undefined => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId as string | undefined;

  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // Emit the list of online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);

    if (userId) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { app, io, server };
