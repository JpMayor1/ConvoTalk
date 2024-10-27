import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <button className="mt-auto p-3" onClick={logout}>
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <p className="flex gap-2 text-red items-center justify-start">
          <BiLogOut className="w-6 h-6 cursor-pointer" />
          Logout
        </p>
      )}
    </button>
  );
};

export default LogoutButton;
