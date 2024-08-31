import useMenuState from "../../stores/useMenuState";
import LogoutButton from "./LogoutButton";
import Menu from "./Menu";
import SearchInput from "./SearchInput";
import Users from "./Users";

const Sidebar = () => {
  const { isOpen } = useMenuState((state) => state);
  return (
    <div
      className={`${
        isOpen ? "w-16 h-12" : "bg-black/90 h-screen border-r border-r-black/30"
      } absolute top-0 left-0 z-10 sm:relative p-4 flex flex-col justify-center transition-all duration-300 ease-in-out`}
    >
      <div className="w-full flex justify-end pb-5">
        <Menu />
      </div>
      {!isOpen && (
        <>
          <SearchInput />
          <div className="divider px-3" />
          <Users />
          <LogoutButton />
        </>
      )}
    </div>
  );
};
export default Sidebar;
