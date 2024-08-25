import axiosInstance from "../axios/axios";

const GetMessagesApi = async (id: string) => {
  const response = await axiosInstance.get(`/api/messages/${id}`);

  return response;
};

const SendMessage = async (id: string, message: string) => {
  const response = await axiosInstance.post(`/api/messages/send/${id}`, {
    message,
  });

  return response;
};

export { GetMessagesApi, SendMessage };
