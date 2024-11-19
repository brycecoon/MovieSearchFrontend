import axios from "axios";
import { List } from "../Data/Interfaces/List";
import { listDTO } from "../Data/DTOs/listDTO";

export const getLists = async (): Promise<List[]> => {
  const response = await axios.get(`/api/list/getAll`);
  return response.data;
};

export const addList = async (list: listDTO) => {
  await axios.post(`/api/list`, list);
};

export const editList = async(list: List) => {
  await axios.put(`/api/list`, list);
};

export const deleteList = async(id: number) => {
  await axios.delete(`/api/list/${id}`);
};
