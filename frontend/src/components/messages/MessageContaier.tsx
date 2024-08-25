import { useEffect } from "react";
import { TiMessages } from "react-icons/ti";
import { useAuthStore } from "../../stores/useAuthStore";
import useConversation from "../../stores/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import logo from "../../assets/convo_talk_logo.jpg";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="px-4 py-2 mb-2">
            <span className="label-text text-black">To:</span>{" "}
            <span className="text-black font-bold">
              {selectedConversation.fullName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const authUser = useAuthStore((state) => state.authUser);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-black/70 font-semibold flex flex-col items-center gap-2">
        <img
          src={logo}
          alt="Convo Talk Logo"
          className="h-60 w-60 rounded-full"
        />
        <p>Greeting! 👋 {authUser?.fullName} 👋</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
