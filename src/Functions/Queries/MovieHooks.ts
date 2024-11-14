import { useQuery } from "@tanstack/react-query";
import { getAllGenres, getMoviesByGenre, getMoviesByPage, getMoviesNowPlaying, getTrendingMovies } from "../MovieRequests";

export const useAllMoviesNowPlaying = () => {
    return useQuery({
      queryKey: ["nowPlayingMovies"],
      queryFn: getMoviesNowPlaying,
    });
  };

  export const useAllTrendingMovies = () => {
    return useQuery({
      queryKey: ["trendingMovies"],
      queryFn: getTrendingMovies,
    });
  };

  export const useMovieByPage = (pageNum: number) => {
    return useQuery({
      queryKey: ["movieByPage", pageNum],
      queryFn: () => getMoviesByPage(pageNum)},
    );
  };

  export const useMovieByGenre = (genreId: number, pageNum: number) => {
    return useQuery({
      queryKey: ["movieByGenre", genreId, pageNum],
      queryFn: () => getMoviesByGenre(genreId, pageNum)},
    );
  };

  export const useAllGenres = () => {
    return useQuery({
      queryKey: ["genres"],
      queryFn: getAllGenres},
    );
  };