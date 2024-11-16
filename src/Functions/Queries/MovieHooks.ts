import { useQuery } from "@tanstack/react-query";
import { getAllGenres, getMoviesByGenre, getMoviesByPage, getMoviesNowPlaying, getSingleMovie, getTrendingMovies, searchByName } from "../MovieRequests";
import { queryKeyFactory } from "./QueryKeyFactory";

export const useAllMoviesNowPlaying = () => {
    return useQuery({
      queryKey: queryKeyFactory.nowPlayingMovies(),
      queryFn: getMoviesNowPlaying,
    });
  };

  export const useAllTrendingMovies = () => {
    return useQuery({
      queryKey: queryKeyFactory.trendingMovies(),
      queryFn: getTrendingMovies,
    });
  };

  export const useMovieByPage = (pageNum: number) => {
    return useQuery({
      queryKey: queryKeyFactory.movieByPage(pageNum),
      queryFn: () => getMoviesByPage(pageNum)},
    );
  };

  export const useMovieByGenre = (genreId: number, pageNum: number) => {
    return useQuery({
      queryKey: queryKeyFactory.movieByGenre(genreId, pageNum),
      queryFn: () => getMoviesByGenre(genreId, pageNum)},
    );
  };

  export const useAllGenres = () => {
    return useQuery({
      queryKey: queryKeyFactory.genres(),
      queryFn: getAllGenres},
    );
  };

  export const useSearchByName = (movieToSearch: string, pageNum: number) => {
    return useQuery({
      queryKey: queryKeyFactory.searchByName(movieToSearch, pageNum),
      queryFn: () => searchByName(movieToSearch, pageNum)},
    );
  };

  export const useGetSingleMovie = (movieId: number) => {
    return useQuery({
      queryKey: queryKeyFactory.getSingleMovie(movieId),
      queryFn: () => getSingleMovie(movieId)},
    );
  };