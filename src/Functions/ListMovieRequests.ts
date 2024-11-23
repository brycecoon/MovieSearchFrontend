import axios from "axios";
import { ListMovie } from "../Data/Interfaces/ListMovie";
import { ListMovieDTO } from "../Data/DTOs/listMovieDTO";

export const getlistMoviesPerList = async (
  listId: number
): Promise<ListMovie[]> => {
  const response = await axios.get(`/api/listMovie/getByListId`, {
    params: { listId },
  });
  return response.data;
};

export const addListMovie = async (listMovie: ListMovieDTO) => {
  await axios.post(`/api/listMovie`, listMovie);
};

export const deleteListMovie = async (listId: number, movieId: number) => {
  await axios.delete(`/api/listMovie/delete`, {
    params: { listId, movieId },
  });
};
