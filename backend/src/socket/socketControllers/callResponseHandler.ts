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

export const callResponseHandler = (
  socket: ExtendedSocket,
  data: {
    receiverUserId: string;
    accepted: boolean;
    audioOnly: boolean;
    signal: any;
  }
) => {
  const { receiverUserId, accepted, signal } = data;

  if (!socket.user) {
    console.error("User data is not set on the socket");
    return;
  }

  const { userId } = socket.user;

  console.log("UserId: ", userId);
  const activeConnections = getActiveConnections(receiverUserId);
  const io = getServerSocketInstance();

  activeConnections.forEach((socketId) => {
    io!.to(socketId).emit("call-response", {
      otherUserId: userId,
      accepted,
      signal,
    });
  });
};
