import {
  getActiveConnections,
  getServerSocketInstance,
} from "../connectedUser";

export const endcall = (receiverUserId: string) => {
  // active connections of the receiver user
  const activeConnections = getActiveConnections(receiverUserId);

  // send call response(accepted or rejected) to all the active connections of the receiver user
  const io = getServerSocketInstance();

  activeConnections.forEach((socketId) => {
    io!.to(socketId).emit("end-call");
  });
};
