export const queryKeyFactory = {
    nowPlayingMovies: () => ["nowPlayingMovies"],
    trendingMovies: () => ["trendingMovies"],
    movieByPage: (pageNum: number) => ["movieByPage", pageNum],
    movieByGenre: (genreId: number, pageNum: number) => ["movieByGenre", genreId, pageNum],
    genres: () => ["genres"],
    searchByName: (movieToSearch: string, pageNum: number) => ["searchByName", movieToSearch, pageNum],
    getSingleMovie: (movieId: number) => ["singleMovie", movieId],
    lists: () => ["lists"],
    listMovies: () => ["listMovies"],
    users: () => ["users"],
    actors: (pageNum: number) => ["actors", pageNum],
    singleActor: (actorId: number) => ["actor", actorId],
    listOfSingleMovies: (listId: number) => ["listOfSingleMovies", listId]
  };