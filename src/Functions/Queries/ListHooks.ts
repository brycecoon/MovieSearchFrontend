import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeyFactory } from "./QueryKeyFactory";
import { addList, deleteList, editList, getLists } from "../ListRequests";

export const useAllLists = () => {
  return useQuery({
    queryKey: queryKeyFactory.lists(),
    queryFn: getLists,
  });
};

export const useAddList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyFactory.lists()});
    },
  });
};

export const useEditList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editList,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeyFactory.lists()});
    },
  });
};

export const useDeleteList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyFactory.lists()});
    },
  });
};
