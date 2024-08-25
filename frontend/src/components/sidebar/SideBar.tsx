import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import Users from "./Users";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3" />
      <Users />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
