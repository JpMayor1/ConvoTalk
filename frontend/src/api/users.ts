import axiosInstance from "../axios/axios";

const GetUsers = async () => {
  const response = await axiosInstance.get("/api/users");

  return response;
};

export { GetUsers };
