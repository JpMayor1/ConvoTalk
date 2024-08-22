import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../stores/useAuthStore";
import axiosInstance from "../axios/axios";
import axios from "axios";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const login = async (username: string, password: string) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/auth/login", {
        username,
        password,
      });

      const result = res.data;

      if (result.error) {
        throw new Error(result.error);
      }

      setAuthUser(result);
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

  return { loading, login };
};
export default useLogin;

function handleInputErrors(username: string, password: string) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
