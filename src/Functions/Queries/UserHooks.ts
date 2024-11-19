import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../UserRequests";
import { queryKeyFactory } from "./QueryKeyFactory";

export const useAllUsers = () => {
    return useQuery({
      queryKey: queryKeyFactory.users(),
      queryFn: getAllUsers,
    });
  };
  