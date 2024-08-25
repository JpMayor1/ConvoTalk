import { User } from "../interfaces/interface";
import { useEffect, useState } from "react";
import { GetUsers } from "../api/users";
import toast from "react-hot-toast";

const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([] as User[]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await GetUsers();
        const data = await res.data;
        if (data.error) {
          throw new Error(data.error);
        }
        setUsers(data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, users };
};

export default useGetUsers;
