import { useEffect, useRef } from "react";
import { IMessage } from "../../interfaces/interface";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import Message from "./Message";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message: IMessage) => (
          <div
            key={message._id}
            ref={
              message._id === messages[messages.length - 1]._id
                ? lastMessageRef
                : null
            }
          >
            <Message message={message} />
          </div>
        ))}

      {loading && (
        <div className="h-full w-full flex items-center justify-center">
          <span className="loading loading-spinner loading-lg text-black/70"></span>
        </div>
      )}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
