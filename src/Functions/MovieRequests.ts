import axios from "axios";
import { Movie } from "../Data/Interfaces/Movie";
import { Genre } from "../Data/Interfaces/Genre";


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

export const getMoviesByGenre = async (genreId: number, pageNum: number): Promise<Movie[]> => {
  const response = await axios.get(`/api/movieapi/getPageOfMoviesByGenre`, {
    params: { genreId, pageNum },
  });
  return response.data;
};

export const getAllGenres = async (): Promise<Genre[]> => {
  const response = await axios.get(`/api/movieapi/generateGenres`)
  return response.data;
};

