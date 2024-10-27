import { Server } from "socket.io";

interface ConnectedUser {
  userId: string;
}

const connectedUsers = new Map<string, ConnectedUser>();
let io: Server | null = null;

export const addNewConnectedUser = ({
  socketId,
  userId,
}: {
  socketId: string;
  userId: string;
}) => {
  if (!connectedUsers.has(socketId)) {
    connectedUsers.set(socketId, { userId });
  } else {
    console.warn(`Socket ID ${socketId} is already connected.`);
  }
};

export const removeDisconnectedUser = (socketId: string) => {
  if (connectedUsers.delete(socketId)) {
    console.log(`User with socket ID ${socketId} has been removed.`);
  } else {
    console.warn(`Socket ID ${socketId} not found.`);
  }
};

export const getActiveConnections = (userId: string) => {
  const activeConnections: string[] = [];

  connectedUsers.forEach((value, key) => {
    if (value.userId === userId) {
      activeConnections.push(key);
    }
  });

  return activeConnections;
};

export const setServerSocketInstance = (ioInstance: Server) => {
  io = ioInstance;
};

export const getServerSocketInstance = (): Server | null => {
  return io;
};
