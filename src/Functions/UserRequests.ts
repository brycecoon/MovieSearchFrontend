import axios from "axios";
import { User } from "../Data/Interfaces/User";

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get(`/api/user/getall`);
  return response.data;
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const response = await axios.get("/api/user/getbyemail", {
    params: { email },
  });
  return response.data;
};
