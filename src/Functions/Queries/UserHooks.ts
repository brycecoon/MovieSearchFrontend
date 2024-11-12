import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../UserRequests";

export const useAllUsers = () => {
    return useQuery({
      queryKey: ["users"],
      queryFn: getAllUsers,
    });
  };
  