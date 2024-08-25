import useGetUsers from "../../hooks/useGetUsers";
import useConversation from "../../stores/useConversation";
import User from "./User";

const Users = () => {
  const { loading, users } = useGetUsers();
  const { searchUser } = useConversation();

  // Filter users based on the search input
  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchUser?.toLowerCase() || "")
  );

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {filteredUsers.map((user, idx) => (
        <User
          key={user._id}
          user={user}
          lastIdx={idx === filteredUsers.length - 1}
        />
      ))}

      {loading && <span className="loading loading-spinner mx-auto"></span>}
    </div>
  );
};

export default Users;
