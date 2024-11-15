export const queryKeyFactory = {
    nowPlayingMovies: () => ["nowPlayingMovies"],
    trendingMovies: () => ["trendingMovies"],
    movieByPage: (pageNum: number) => ["movieByPage", pageNum],
    movieByGenre: (genreId: number, pageNum: number) => ["movieByGenre", genreId, pageNum],
    genres: () => ["genres"],
    searchByName: (movieToSearch: string, pageNum: number) => ["searchByName", movieToSearch, pageNum],
  };