import { useQuery } from "@tanstack/react-query";
import { queryKeyFactory } from "./QueryKeyFactory";
import { getPopularActors } from "../ActorRequests";

export const useGetAllActors = (pageNum: number) => {
    return useQuery({
      queryKey: queryKeyFactory.actors(pageNum),
      queryFn: () => getPopularActors(pageNum),
    });
  };