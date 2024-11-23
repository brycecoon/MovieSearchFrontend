import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeyFactory } from "./QueryKeyFactory";
import {
  addListMovie,
  deleteListMovie,
  getlistMoviesPerList,
} from "../ListMovieRequests";
import { toast } from "react-toastify";

export const useAllListMoviesPerList = (listId: number) => {
  return useQuery({
    queryKey: queryKeyFactory.listMoviesPerList(listId),
    queryFn: () => getlistMoviesPerList(listId),
  });
};

export const useAddListMovie = (listId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addListMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.listMoviesPerList(listId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.movieListByListId(listId),
      });
      toast.success("Movie Added To List");
    },
    onError: () => {
      toast.error("Error adding To List");
    },
  });
};

export const useDeleteListMovie = (listId: number, movieId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteListMovie(listId, movieId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.listMoviesPerList(listId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.movieListByListId(listId),
      });
      toast.success("Movie Deleted From List");
    },
    onError: () => {
      toast.error("Error Deleting From List");
    },
  });
};
