import { useQuery } from "@tanstack/react-query";
import { getMoviesByPage, getMoviesNowPlaying, getTrendingMovies } from "../MovieRequests";

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
      queryFn: () =>
       { console.log("fetching " + pageNum);
        return getMoviesByPage(pageNum)},
    });
  };