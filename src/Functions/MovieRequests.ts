import axios from "axios";
import { Movie } from "../Data/Interfaces/Movie";


export const getMoviesNowPlaying = async (): Promise<Movie[]> => {
  const response = await axios.get(`/api/movieapi/getNowPlaying`);
  return response.data;
};

export const getTrendingMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(`/api/movieapi/getTrendingMovies`);
  return response.data;
};

export const getMoviesByPage = async (pageNum: number): Promise<Movie[]> => {
  const response = await axios.get(`/api/movieapi/getMoviesByPage`, {
    params: { pageNum },
  });
  return response.data;
};

