import { useState, useEffect } from "react";

export const useFetchFilms = (queryParam) => {
  const [fetchedFilms, setFetchedFilms] = useState([]);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const baseGenreUrl = "https://api.themoviedb.org/3/discover/movie?";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchFilms = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${baseGenreUrl}api_key=${API_KEY}&with_genres=${queryParam}`
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setFetchedFilms(data.results);
      } catch (error) {
        setErrors(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (queryParam) fetchFilms();
  }, [queryParam, API_KEY]);

  return { fetchedFilms, errors, isLoading };
};
