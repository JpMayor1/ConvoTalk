import useGetUsers from "../../hooks/useGetUsers";
import User from "./User";

const Users = () => {
  const { loading, users } = useGetUsers();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {users.map((user, idx) => (
        <User key={user._id} user={user} lastIdx={idx === users.length - 1} />
      ))}

      {loading && <span className="loading loading-spinner mx-auto"></span>}
    </div>
  );
};
export default Users;
