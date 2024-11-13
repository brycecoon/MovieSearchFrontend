import axios from "axios";
import { User } from "../Data/Interfaces/User";
import {UserDTO} from "../Data/DTOs/userDTO"

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get(`/api/user/getall`);
  return response.data;
};

export const AddUser = async (newUser: UserDTO) => {
  await axios.post("/api/user/add", newUser, {
    headers: { "Content-Type": "application/json", },
  });
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const response = await axios.get("/api/user/getbyemail", {
    params: { email },
  });
  return response.data;
};
