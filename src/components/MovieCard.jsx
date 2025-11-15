import React from "react";
import { Link } from "react-router-dom";
import { IMG_BASE } from "../api/api";

export default function MovieCard({ movie }) {
  const poster = movie.poster_path ? (IMG_BASE + movie.poster_path) : null;
  return (
    <Link to={`/movie/${movie.id}`} className="mrapp-mcard-link" aria-label={movie.title}>
      <article className="mrapp-mcard">
        <div className="mrapp-mcard-thumb">
          {poster ? (
            <img src={poster} alt={movie.title} loading="lazy" />
          ) : (
            <div className="mrapp-no-thumb">No Image</div>
          )}
        </div>
        <div className="mrapp-mcard-body">
          <h3 className="mrapp-mcard-title">{movie.title}</h3>
          <div className="mrapp-mcard-meta">
            <span className="mrapp-chip">⭐ {movie.vote_average?.toFixed(1) || "—"}</span>
            <span className="mrapp-year">{(movie.release_date || "").slice(0, 4)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
