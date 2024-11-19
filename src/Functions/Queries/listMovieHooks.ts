import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeyFactory } from "./QueryKeyFactory";
import { addListMovie, deleteListMovie, getlistMovies } from "../ListMovieRequests";

export const useAllListMovies = () => {
  return useQuery({
    queryKey: queryKeyFactory.listMovies(),
    queryFn: getlistMovies,
  });
};

export const useAddListMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addListMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyFactory.listMovies()});
    },
  });
};

export const useDeleteListMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteListMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyFactory.listMovies()});
    },
  });
};
