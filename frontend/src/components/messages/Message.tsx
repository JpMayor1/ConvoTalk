import { IMessage } from "../../interfaces/interface";
import { extractTime } from "../../utils/extractTime";
import { useAuthStore } from "../../stores/useAuthStore";
import useConversation from "../../stores/useConversation";

interface MessageProps {
  message: IMessage;
}

const Message = ({ message }: MessageProps) => {
  const authUser = useAuthStore((state) => state.authUser);
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser?._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser?.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-primaryColor" : "bg-black/70";

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2 max-w-96`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-secondaryColor">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
