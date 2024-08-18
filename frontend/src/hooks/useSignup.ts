import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../stores/useAuthStore";
import axiosInstance from "../axios/axios";

interface SignupData {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const signup = async (data: SignupData) => {
    const { fullName, username, password, confirmPassword, gender } = data;
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/auth/signup", data);

      const result = res.data;
      if (result.error) {
        throw new Error(result.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(result));
      setAuthUser(result);
      toast.success("Signup successful!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}: SignupData) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
