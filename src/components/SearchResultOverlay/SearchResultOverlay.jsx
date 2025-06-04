import styles from "./SearchResultOverlay.module.css";
import { useEffect, useState } from "react";
import { useSearch } from "../../context/searchContext";

import Button from "../Button/Button";
import Spinner from "../Spinner/Spinner";
import MovieCard from "../MovieCard/MovieCard";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const SearchResultsOverlay = () => {
  const { searchTerm, isSearching, setIsSearching } = useSearch();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSearching || !searchTerm) {
      setResults([]);
      return;
    }
    setLoading(true);
    const fetchResults = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            searchTerm
          )}`
        );
        const data = await res.json();
        setResults(data.results || []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [searchTerm, isSearching]);

  if (!isSearching) return null;

  return (
    <div className={styles.searchOverlay}>
      <Button
        onClick={() => setIsSearching(false)}
        className={styles.closeSearchButton}
      >
        X
      </Button>
      <h2>Search Results</h2>
      {loading && <Spinner />}
      {!loading && results.length === 0 && <p>No results found.</p>}
      <div className={styles.searchResultsContainer}>
        {results.map((film) => (
          <MovieCard key={film.id} film={film}></MovieCard>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsOverlay;
