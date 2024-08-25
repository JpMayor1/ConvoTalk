import axios from "axios";
import baseURL from "./baseURL";

const axiosInstance = axios.create({
  //   baseURL: 'https://your-api-url.com',
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
