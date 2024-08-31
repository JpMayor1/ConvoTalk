import MessageContainer from "../components/messages/MessageContaier";
import Sidebar from "../components/sidebar/SideBar";
import useListenMessages from "../hooks/useListenMessages";

const Home = () => {
  useListenMessages();
  return (
    <div className="flex h-screen overflow-hidden bg-black/20 bg-clip-padding backdrop-filter backdrop-blur-sm">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
