import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeyFactory } from "./QueryKeyFactory";
import { addList, deleteList, editList, getLists } from "../ListRequests";
import { toast } from "react-toastify";

export const useAllLists = (userId: number) => {
  return useQuery({
    queryKey: queryKeyFactory.lists(),
    queryFn: () => getLists(userId),
  });
};

export const useAddList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyFactory.lists() });
      toast.success("List Added");
    },
    onError: () => {
      toast.error("Error Adding List");
    },
  });
};

export const useEditList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyFactory.lists() });
      toast.success("Name Updated");
    },
    onError: () => {
      toast.error("Error Updating List Name");
    },
  });
};

export const useDeleteList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyFactory.lists() });
      toast.success("List Deleted");
    },
    onError: () => {
      toast.error("Error Deleting List");
    },
  });
};
