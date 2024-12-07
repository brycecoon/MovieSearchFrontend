import axios from "axios";
import { Movie } from "../Data/Interfaces/Movie";
import { Genre } from "../Data/Interfaces/Genre";
import { SingleMovieDetails } from "../Data/Interfaces/SingleMovie";

export const getMoviesNowPlaying = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(`/api/movieapi/getNowPlaying`);
    return response.data;
  } catch {
    throw new Error(
      "There was a problem fetching movies. Please try again later."
    );
  }
};

export const getTrendingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(`/api/movieapi/getTrendingMovies`);
    return response.data;
  } catch {
    throw new Error(
      "There was a problem fetching movies. Please try again later."
    );
  }
};

export const getMoviesByPage = async (pageNum: number): Promise<Movie[]> => {
  try {
    const response = await axios.get(`/api/movieapi/getMoviesByPage`, {
      params: { pageNum },
    });
    return response.data;
  } catch {
    throw new Error(
      "There was a problem fetching movies. Please try again later."
    );
  }
};

export const getMoviesByGenre = async (
  genreId: number,
  pageNum: number
): Promise<Movie[]> => {
  try {
    const response = await axios.get(`/api/movieapi/getPageOfMoviesByGenre`, {
      params: { genreId, pageNum },
    });
    return response.data;
  } catch {
    throw new Error(
      "There was a problem fetching movies. Please try again later."
    );
  }
};

export const getAllGenres = async (): Promise<Genre[]> => {
  try {
    const response = await axios.get(`/api/movieapi/generateGenres`);
    return response.data;
  } catch {
    throw new Error(
      "There was a problem fetching movies. Please try again later."
    );
  }
};

export const searchByName = async (
  movieToSearch: string,
  pageNum: number
): Promise<Movie[]> => {
  try {
    const response = await axios.get(`/api/movieapi/searchMovies`, {
      params: { movieToSearch, pageNum },
    });
    return response.data;
  } catch {
    throw new Error(
      "There was a problem fetching movies. Please try again later."
    );
  }
};

export const getSingleMovie = async (
  movieId: number
): Promise<SingleMovieDetails> => {
  try {
    const response = await axios.get(`/api/movieapi/getSingleMovieDetails`, {
      params: { movieId },
    });
    return response.data;
  } catch {
    throw new Error(
      "There was a problem fetching movies. Please try again later."
    );
  }
};
