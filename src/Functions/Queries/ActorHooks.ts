import { useQuery } from "@tanstack/react-query";
import { queryKeyFactory } from "./QueryKeyFactory";
import { getActorById, getPopularActors } from "../ActorRequests";

export const useGetAllActors = (pageNum: number) => {
    return useQuery({
      queryKey: queryKeyFactory.actors(pageNum),
      queryFn: () => getPopularActors(pageNum),
    });
  };

  export const useGetActorById = (actorId: number) => {
    return useQuery({
      queryKey: queryKeyFactory.singleActor(actorId),
      queryFn: () => getActorById(actorId),
    });
  };