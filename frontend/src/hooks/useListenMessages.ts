import { useEffect } from "react";
import { IMessage } from "../interfaces/interface";
import { useSocketContext } from "../socket/useSocketContext";
import notificationSound from "../assets/chat_sound.mp3";
import useConversation from "../stores/useConversation";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation, setNewMessageNotif } =
    useConversation();

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

      if (conversationId !== newMessage.senderId) {
        setNewMessageNotif({
          senderId: newMessage.senderId,
          hasNewMessage: true,
          numberOfMessage: 1,
        });
      }
    };

    socket.on("newMessage", handleNewMessage);

    // Cleanup function to remove the event listener
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages, messages, selectedConversation, setNewMessageNotif]);

  return null;
};

export default useListenMessages;
