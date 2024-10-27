import { useEffect } from "react";
import { TiMessages } from "react-icons/ti";
import { useAuthStore } from "../../stores/useAuthStore";
import { IoIosCall, IoMdVideocam } from "react-icons/io";
import useConversation from "../../stores/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import logo from "../../assets/convo_talk_logo.jpg";
import { useSocketContext } from "../../socket/useSocketContext";
import useVideoChatStore from "../../stores/useVideoChatStore";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { callRequest } = useSocketContext();
  const { setReceiverId } = useVideoChatStore();
  const authUser = useAuthStore((state) => state.authUser);

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const handleCallRequest = (audioOnly: boolean) => {
    if (!selectedConversation || !authUser) return;

    callRequest({
      receiverUserId: selectedConversation._id,
      callerName: authUser.fullName,
      audioOnly,
    });

    setReceiverId(selectedConversation._id);
  };

  return (
    <div className="w-full flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="w-full flex items-center justify-end gap-5 pr-4 sm:pr-10 py-2 mb-2">
            <button onClick={() => handleCallRequest(true)}>
              <IoIosCall className="text-primaryColor h-7 w-7 sm:h-8 sm:w-8" />
            </button>
            {/* for video call */}
            <button onClick={() => handleCallRequest(false)}>
              <IoMdVideocam className="text-primaryColor h-7 w-7 sm:h-8 sm:w-8" />
            </button>
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
