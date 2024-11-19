import axios from "axios";
import { ListMovie } from "../Data/Interfaces/ListMovie";
import { ListMovieDTO } from "../Data/DTOs/listMovieDTO";

export const getlistMovies = async (): Promise<ListMovie[]> => {
  const response = await axios.get(`/api/listMovie/getAll`);
  return response.data;
};

export const addListMovie = async (listMovie: ListMovieDTO) => {
  await axios.post(`/api/listMovie`, listMovie);
};

export const deleteListMovie = async(id: number) => {
  await axios.delete(`/api/listMovie/${id}`);
};
