import { useContext } from "react";
import { SocketContext } from "./SocketContext";

// Custom hook to use the SocketContext
export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};
