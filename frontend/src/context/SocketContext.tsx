import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { Socket, io } from "socket.io-client";
import { useAuthStore } from "../stores/useAuthStore";
import baseURL from "../axios/baseURL";

// Define types for the context state
interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
}

// Create context with an initial value of null or an empty object for type safety
const SocketContext = createContext<SocketContextType | undefined>(undefined);

// Custom hook to use the SocketContext
export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

// Define props for the provider component
interface SocketContextProviderProps {
  children: ReactNode;
}

export const SocketContextProvider = ({
  children,
}: SocketContextProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const authUser = useAuthStore((state) => state.authUser);

  useEffect(() => {
    if (authUser) {
      const socket = io(baseURL, {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);

      // Listen for online users
      socket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
