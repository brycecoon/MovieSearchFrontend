import { useQuery } from "@tanstack/react-query";
import { getMoviesNowPlaying, getTrendingMovies } from "../MovieRequests";

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