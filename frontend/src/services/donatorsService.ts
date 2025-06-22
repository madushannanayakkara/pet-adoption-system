import axiosInstance from "./axiosInstance";

export const fetchTestData = async () => {
  const response = await axiosInstance.get("/users/test");
  return response;
};
