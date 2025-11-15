import React, { useEffect, useState, useCallback } from "react";
import { fetchTrendingMovies, searchMovies } from "../api/api";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queryActive, setQueryActive] = useState("");

  const loadTrending = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTrendingMovies();
      setMovies(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTrending();
  }, [loadTrending]);

  const handleSearch = useCallback(async (q) => {
    setQueryActive(q || "");
    if (!q) {
      loadTrending();
      return;
    }
    setLoading(true);
    try {
      const data = await searchMovies(q);
      setMovies(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [loadTrending]);

  return (
    <main className="mrapp-container">
      <header className="mrapp-hero">
        <div className="mrapp-hero-inner">
          <h1 className="mrapp-hero-title">Find your next favorite movie</h1>
          <p className="mrapp-hero-sub">Search, explore details, and get recommendations — built with TMDB</p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <section className="mrapp-grid-section">
        <div className="mrapp-grid-head">
          <h2>{queryActive ? `Results for “${queryActive}”` : "Trending this week"}</h2>
          <span className="mrapp-count">{movies.length} movies</span>
        </div>

        {loading ? (
          <div className="mrapp-loader-wrap"><Loader /></div>
        ) : (
          <div className="mrapp-grid">
            {movies.length ? movies.map(m => <MovieCard key={m.id} movie={m} />) : (
              <div className="mrapp-empty">No movies found. Try another search.</div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
