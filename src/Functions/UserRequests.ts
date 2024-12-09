import axios from "axios";
import { User } from "../Data/Interfaces/User";
import {UserDTO} from "../Data/DTOs/userDTO"

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get(`/api/user/getall`);
  return response.data;
};

export const AddUser = async (newUser: UserDTO) => {
  await axios.post("/api/user/add", newUser);
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const response = await axios.get("/api/user/getByEmail", {
    params: { email },
  });
  return response.data;
};

export const editUser = async (user: User) => {
  await axios.put("/api/user/edit", user);
};
