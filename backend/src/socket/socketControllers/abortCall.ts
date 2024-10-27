import {
  getActiveConnections,
  getServerSocketInstance,
} from "../connectedUser";

export const abortcall = (userId: string) => {
  const activeConnections = getActiveConnections(userId);

  const io = getServerSocketInstance();

  activeConnections.forEach((socketId) => {
    io!.to(socketId).emit("abortCall");
  });
};
