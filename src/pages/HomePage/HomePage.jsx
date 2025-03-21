import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList.jsx";
import styles from "./HomePage.module.css";

const API_BASE = "https://api.themoviedb.org/3";

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/trending/movie/day`, {
        headers: {},
      })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
