import { useSocketContext } from "../../context/useSocketContext";
import { User as IUSer } from "../../interfaces/interface";
import useConversation from "../../stores/useConversation";

const User = ({ user, lastIdx }: { user: IUSer; lastIdx: boolean }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?._id === user._id;
  const isOnline = onlineUsers.includes(user._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-primaryColor/70 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-primaryColor/70" : ""}
			`}
        onClick={() => setSelectedConversation(user)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={user.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-black/60">{user.fullName}</p>
            {/* {hasNewMessage && (
              <span className="text-xl">Has new message...</span>
            )} */}
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default User;
