import { Socket } from "socket.io";
import { addNewConnectedUser } from "../connectedUser";

interface User {
  userId: string;
}

interface ExtendedSocket extends Socket {
  user: User;
}

export const newConnectionHandler = (socket: ExtendedSocket) => {
  const userId = socket.handshake.query.userId as string;

  if (userId) {
    socket.user = { userId };
    addNewConnectedUser({ socketId: socket.id, userId });
  } else {
    console.error("User ID not provided during connection");
  }
};
