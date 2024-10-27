import useMenuState from "../../stores/useMenuState";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import Users from "./Users";

const Sidebar = () => {
  const { isOpen } = useMenuState((state) => state);
  return (
    <div
      className={`absolute top-0 left-0 z-10 w-64 h-screen p-2 pt-12 bg-black flex flex-col justify-center transition-all duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <SearchInput />
      <div className="divider px-3" />
      <Users />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
