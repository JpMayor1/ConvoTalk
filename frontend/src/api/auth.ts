import axiosInstance from "../axios/axios";

const LoginApi = async (username: string, password: string) => {
  const response = await axiosInstance.post("/api/auth/login", {
    username,
    password,
  });

  return response;
};

const SignupApi = async (
  fullName: string,
  username: string,
  password: string,
  confirmPassword: string,
  gender: string
) => {
  const response = await axiosInstance.post("/api/auth/signup", {
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  });

  return response;
};

const LogoutApi = async () => {
  const response = await axiosInstance.post("/api/auth/logout");

  return response;
};

export { LoginApi, SignupApi, LogoutApi };
