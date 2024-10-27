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
        isOpen
          ? "w-16 h-12 justify-start"
          : "bg-black/90 w-full md:w-96 h-full border-r border-r-black/30 justify-center"
      } absolute top-0 left-0 z-10 sm:relative p-4 flex flex-col transition-all duration-300 ease-in-out`}
    >
      <div className="w-full flex justify-end py-5">
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
