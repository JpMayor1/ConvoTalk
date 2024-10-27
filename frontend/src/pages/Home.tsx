import MessageContainer from "../components/messages/MessageContaier";
import CallerVideoCall from "../components/calls/CallerVideoCall";
import ReceiverVideoCall from "../components/calls/ReceiverCall";
import useVideoChatStore from "../stores/useVideoChatStore";
import useListenMessages from "../hooks/useListenMessages";
import Sidebar from "../components/sidebar/SideBar";
import Menu from "../components/sidebar/Menu";

const Home = () => {
  useListenMessages();
  const { startedCall, receivingCall } = useVideoChatStore();

  return (
    <>
      {startedCall && <CallerVideoCall />}
      {receivingCall && <ReceiverVideoCall />}

      <div className="flex items-start justify-start h-screen w-screen overflow-hidden backdrop-blur-sm">
        <div className="absolute top-0 left-0 w-fit h-fit z-20">
          <Menu />
        </div>
        <Sidebar />
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex h-full w-full lg:h-[90%] max-w-screen-lg lg:border-2 lg:border-black/50 rounded-md">
            <MessageContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
