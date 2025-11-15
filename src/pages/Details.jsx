import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getRecommendations, IMG_BASE } from "../api/api";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

export default function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [m, r] = await Promise.all([getMovieDetails(id), getRecommendations(id)]);
        setMovie(m);
        setRecs((r.results || []).slice(0, 8));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="mrapp-loader-wrap"><Loader /></div>;
  if (!movie) return <div className="mrapp-empty">Movie not found.</div>;

  const poster = movie.poster_path ? (IMG_BASE + movie.poster_path) : null;

  return (
    <main className="mrapp-container">
      <div className="mrapp-backwrap">
        <Link to="/" className="mrapp-back">← Back to Home</Link>
      </div>

      <section className="mrapp-details">
        <div className="mrapp-details-left">
          {poster ? <img className="mrapp-details-poster" src={poster} alt={movie.title} /> : <div className="mrapp-no-thumb">No Image</div>}
        </div>

        <div className="mrapp-details-right">
          <h1 className="mrapp-details-title">{movie.title}</h1>
          <div className="mrapp-details-meta">
            <span className="mrapp-chip">⭐ {movie.vote_average?.toFixed(1) || "—"}</span>
            <span>{movie.release_date}</span>
            <span>{movie.runtime ? `${movie.runtime} min` : ""}</span>
          </div>

          <p className="mrapp-overview">{movie.overview}</p>

          <div className="mrapp-credits">
            <h4>Top cast</h4>
            <div className="mrapp-cast-list">
              {(movie.credits?.cast || []).slice(0, 6).map(c => (
                <div key={c.cast_id || c.credit_id} className="mrapp-cast">
                  <div className="mrapp-cast-name">{c.name}</div>
                  <div className="mrapp-cast-role">{c.character}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mrapp-recs">
        <h3>Recommendations</h3>
        <div className="mrapp-grid">
          {recs.length ? recs.map(r => <MovieCard key={r.id} movie={r} />) : <div className="mrapp-empty">No recommendations found.</div>}
        </div>
      </section>
    </main>
  );
}
