import { useEffect } from "react";
import { IMessage } from "../interfaces/interface";
import { useSocketContext } from "../context/useSocketContext";
import notificationSound from "../assets/chat_sound.mp3";
import useConversation from "../stores/useConversation";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage: IMessage) => {
      const conversationId = selectedConversation?._id;

      const sound = new Audio(notificationSound);
      sound.play();

      if (conversationId === newMessage.senderId) {
        newMessage.shouldShake = true;
        setMessages([...messages, newMessage]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    // Cleanup function to remove the event listener
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages, messages, selectedConversation]);

  return null;
};

export default useListenMessages;
