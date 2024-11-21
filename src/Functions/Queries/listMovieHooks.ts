import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeyFactory } from "./QueryKeyFactory";
import {
  addListMovie,
  deleteListMovie,
  getlistMovies,
} from "../ListMovieRequests";
import { toast } from "react-toastify";

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
      queryClient.invalidateQueries({ queryKey: queryKeyFactory.listMovies() });
      toast.success("Movie Added To List");
    },
    onError: () => {
      toast.error("Error adding To List");
    },
  });
};

export const useDeleteListMovie = (listId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteListMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyFactory.listMovies() });
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.listOfSingleMovies(listId),
      });
      toast.success("Movie Deleted From List");
    },
    onError: () => {
      toast.error("Error Deleting From List");
    },
  });
};
