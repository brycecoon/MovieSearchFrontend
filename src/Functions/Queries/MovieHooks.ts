import { useQuery } from "@tanstack/react-query";
import {
  getAllGenres,
  getMoviesByGenre,
  getMoviesByPage,
  getMoviesNowPlaying,
  getSingleMovie,
  getTrendingMovies,
  searchByName,
} from "../MovieRequests";
import { queryKeyFactory } from "./QueryKeyFactory";
import { useAllListMoviesPerList } from "./listMovieHooks";

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
    queryFn: () => getMoviesByPage(pageNum),
  });
};

export const useMovieByGenre = (genreId: number, pageNum: number) => {
  return useQuery({
    queryKey: queryKeyFactory.movieByGenre(genreId, pageNum),
    queryFn: () => getMoviesByGenre(genreId, pageNum),
  });
};

export const useAllGenres = () => {
  return useQuery({
    queryKey: queryKeyFactory.genres(),
    queryFn: getAllGenres,
  });
};

export const useSearchByName = (movieToSearch: string, pageNum: number) => {
  return useQuery({
    queryKey: queryKeyFactory.searchByName(movieToSearch, pageNum),
    queryFn: () => searchByName(movieToSearch, pageNum),
  });
};

export const useGetSingleMovie = (movieId: number) => {
  return useQuery({
    queryKey: queryKeyFactory.getSingleMovie(movieId),
    queryFn: () => getSingleMovie(movieId),
  });
};

export const useMovieListByListId = (listId: number) => {
  const { data: listMovies, isLoading: isListMoviesLoading } = useAllListMoviesPerList(listId);

  return useQuery({
    queryKey: queryKeyFactory.movieListByListId(listId),
    queryFn: async () => {
      if (!listMovies) return []; 

      const filteredMovies = listMovies.filter((lm) => lm.listId === listId);
      const movieDetails = await Promise.all(
        filteredMovies.map((lm) => getSingleMovie(lm.movieId))
      );
      return movieDetails;
    },
    enabled: !isListMoviesLoading && !!listMovies, 
  });
};
