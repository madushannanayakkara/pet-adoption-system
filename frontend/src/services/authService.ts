import axiosInstance from "./axiosInstance";

export const loginUser = async (loginDetails: any) => {
  const response = await axiosInstance.post("/auth/login", loginDetails);
  return response;
};

export const registerUser = async (registrationDetails: any) => {
  const response = await axiosInstance.post(
    "/users/register",
    registrationDetails
  );
  return response;
};
