import { useState } from "react";
import { LogoutApi } from "../api/auth";
import { useAuthStore } from "../stores/useAuthStore";
import toast from "react-hot-toast";
import axios from "axios";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const setAuthUser = useAuthStore((state) => state.setAuthUser);
  const logout = async () => {
    setLoading(true);
    try {
      const res = await LogoutApi();
      const result = res.data;

      if (result.error) {
        throw new Error(result.error);
      }

      setAuthUser(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle AxiosError specifically
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
        } else {
          toast.error("An error occurred during signup.");
        }
      } else if (error instanceof Error) {
        // Handle other types of errors
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
