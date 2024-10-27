import { Socket } from "socket.io";
import {
  getActiveConnections,
  getServerSocketInstance,
} from "../connectedUser";

interface User {
  userId: string;
}

interface ExtendedSocket extends Socket {
  user?: User;
}

export const callRequestHandler = (
  socket: ExtendedSocket,
  data: {
    receiverUserId: string;
    callerName: string;
    audioOnly: boolean;
    signal: any;
  }
) => {
  const { receiverUserId, callerName, audioOnly, signal } = data;

  if (!socket.user) {
    console.error("User data is not set on the socket");
    return;
  }

  const callerUserId = socket.user.userId;

  const activeConnections = getActiveConnections(receiverUserId);
  const io = getServerSocketInstance();

  activeConnections.forEach((socketId) => {
    io!.to(socketId).emit("call-request", {
      callerName,
      callerUserId,
      audioOnly,
      signal,
    });
  });
};
