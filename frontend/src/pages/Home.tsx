import MessageContainer from "../components/messages/MessageContaier";
import Sidebar from "../components/sidebar/SideBar";

const Home = () => {
  return (
    <div className="flex h-screen rounded-lg overflow-hidden bg-transparent bg-clip-padding backdrop-filter backdrop-blur-lg">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
