import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/useSocketContext";
import { User as IUser } from "../../interfaces/interface";
import useConversation from "../../stores/useConversation";
import useMenuState from "../../stores/useMenuState";

const User = ({ user, lastIdx }: { user: IUser; lastIdx: boolean }) => {
  const {
    selectedConversation,
    setSelectedConversation,
    newMessageNotif,
    clearNewMessageNotif,
  } = useConversation();
  const { onlineUsers } = useSocketContext();
  const { isOpen, setIsOpen } = useMenuState((state) => state);
  const { searchUser, setSearchUser } = useConversation();

  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    const notification = newMessageNotif.find(
      (notif) => notif.senderId === user._id && notif.hasNewMessage
    );
    setHasNewMessage(!!notification);
    setMessageCount(notification ? notification.numberOfMessage : 0);
  }, [newMessageNotif, user._id]);

  const isSelected = selectedConversation?._id === user._id;
  const isOnline = onlineUsers.includes(user._id);

  const handleUserSelection = () => {
    setSelectedConversation(user);
    clearNewMessageNotif(user._id);
    setIsOpen(!isOpen);

    if (searchUser) {
      setSearchUser("");
    }
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-primaryColor/70 rounded p-2 py-1 cursor-pointer
          ${isSelected ? "bg-primaryColor/70" : ""}
        `}
        onClick={handleUserSelection}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={user.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p
              className={`font-bold drop-shadow-lg ${
                hasNewMessage ? "text-white" : "text-white/60"
              }`}
            >
              {user.fullName}
            </p>
          </div>
          {hasNewMessage && (
            <p className="text-red text-sm">
              {messageCount} new message{messageCount > 1 && "s"}
            </p>
          )}
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default User;
