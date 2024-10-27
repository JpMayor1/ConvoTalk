import { Server } from "socket.io";
import http from "http";
import express from "express";
import { newConnectionHandler } from "./socketControllers/newConnectionHandler";
import {
  removeDisconnectedUser,
  setServerSocketInstance,
} from "./connectedUser";
import { callRequestHandler } from "./socketControllers/callRequestHandler";
import { callResponseHandler } from "./socketControllers/callResponseHandler";
import { endcall } from "./socketControllers/endCall";
import { abortcall } from "./socketControllers/abortCall";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);
const allowedOrigins = process.env.FRONTEND_URLS?.split(",") || [];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

setServerSocketInstance(io);

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
  newConnectionHandler(socket as any);
  const userId = socket.handshake.query.userId as string | undefined;

  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    socket.data.userId = userId;
  }

  // Emit the list of online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("call-request", (data) => {
    callRequestHandler(socket as any, data);
  });

  socket.on("call-response", (data) => {
    callResponseHandler(socket as any, data);
  });

  socket.on("abortCall", (userId) => {
    abortcall(userId);
  });

  socket.on("end-call", (receiverUserId) => {
    endcall(receiverUserId);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    removeDisconnectedUser(socket.id);

    if (userId) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { app, io, server };
