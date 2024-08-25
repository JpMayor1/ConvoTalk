import { useState } from "react";
import { SignupApi } from "../api/auth";
import { useAuthStore } from "../stores/useAuthStore";
import toast from "react-hot-toast";
import axios from "axios";

interface SignupData {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

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
      const res = await SignupApi(
        fullName,
        username,
        password,
        confirmPassword,
        gender
      );
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

  return { loading, signup };
};

export default useSignup;
