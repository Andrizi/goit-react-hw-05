import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieCast.module.css";

const API_BASE = "https://api.themoviedb.org/3";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/movie/${movieId}/credits`, {
        headers: {},
      })
      .then((response) => {
        setCast(response.data.cast);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [movieId]);

  return (
    <div className={styles.castContainer}>
      <h3>Cast</h3>
      {cast.length > 0 ? (
        <ul className={styles.castList}>
          {cast.map((actor) => (
            <li key={actor.cast_id} className={styles.castItem}>
              {actor.name} as {actor.character}
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast information available.</p>
      )}
    </div>
  );
}
export default MovieCast;
