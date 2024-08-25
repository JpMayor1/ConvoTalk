import { createContext, useState, useEffect, useRef, ReactNode } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { Socket, io } from "socket.io-client";
import baseURL from "../axios/baseURL";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
}

interface SocketContextProviderProps {
  children: ReactNode;
}

// Create context with an initial value of null or an empty object for type safety
export const SocketContext = createContext<SocketContextType | undefined>(
  undefined
);

export const SocketContextProvider = ({
  children,
}: SocketContextProviderProps) => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const authUser = useAuthStore((state) => state.authUser);

  // Use a ref to store the socket instance
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (authUser) {
      const socketInstance = io(baseURL, {
        query: {
          userId: authUser._id,
        },
      });
      socketRef.current = socketInstance;

      // Listen for online users
      socketInstance.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socketInstance.close();
      };
    } else {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
