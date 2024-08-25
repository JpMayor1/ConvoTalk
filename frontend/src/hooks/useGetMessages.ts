import { useEffect, useState } from "react";
import { GetMessagesApi } from "../api/messages";
import useConversation from "../stores/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        if (selectedConversation?._id) {
          const res = await GetMessagesApi(selectedConversation?._id);
          const data = await res.data;
          if (data.error) {
            throw new Error(data.error);
          }
          setMessages(data);
        } else {
          toast.error("Please select a conversation");
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
