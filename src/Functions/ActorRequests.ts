import axios from "axios";
import { Actor } from "../Data/Interfaces/Actor";
import { SinglePersonDetails } from "../Data/Interfaces/SinglePersonDetails";

export const getPopularActors = async (pageNum: number): Promise<Actor[]> => {
  const response = await axios.get(
    `/api/MovieStar/getPopular?pageNum=${pageNum}`
  );
  return response.data;
};

export const getActorById = async (
  actorId: number
): Promise<SinglePersonDetails> => {
  const response = await axios.get(`/api/MovieStar/getById?actorId=${actorId}`);
  return response.data;
};
