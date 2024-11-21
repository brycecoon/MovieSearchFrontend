import axios from "axios";
import { Actor } from "../Data/Interfaces/Actor";

export const getPopularActors = async (pageNum: number): Promise<Actor[]> => {
    const response = await axios.get(`/api/MovieStar/getPopular?pageNum=${pageNum}`);
    return response.data;
  };