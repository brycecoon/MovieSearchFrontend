

const MovieKeys = {
    movies: ["movies"] as const,
    models: () => [...MovieKeys.movies, "model"] as const,
    model: (filters: string) => [...MovieKeys.models(), { filters }] as const,
  };