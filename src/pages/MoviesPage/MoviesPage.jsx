import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import styles from "./MoviesPage.module.css";

const API_BASE = "https://api.themoviedb.org/3";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const [query, setQuery] = useState(queryParam);

  useEffect(() => {
    if (queryParam === "") {
      setMovies([]);
      return;
    }

    axios
      .get(`${API_BASE}/search/movie`, {
        params: {
          query: queryParam,
          include_adult: false,
          language: "en-US",
          page: 1,
        },
        headers: {},
      })
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [queryParam]);
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      setSearchParams({});
      setMovies([]);
      return;
    }
    setSearchParams({ query });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search Movies</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter movie name"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
