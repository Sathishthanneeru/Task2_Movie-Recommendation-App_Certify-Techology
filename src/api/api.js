const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE = "https://api.themoviedb.org/3";
export const IMG_BASE = "https://image.tmdb.org/t/p/w500";

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("API fetch failed");
  return res.json();
}

export function fetchTrendingMovies() {
  const url = `${BASE}/trending/movie/week?api_key=${API_KEY}`;
  return fetchJSON(url);
}

export function searchMovies(query) {
  const url = `${BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
  return fetchJSON(url);
}

export function getMovieDetails(id) {
  const url = `${BASE}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`;
  return fetchJSON(url);
}

export function getRecommendations(id) {
  const url = `${BASE}/movie/${id}/recommendations?api_key=${API_KEY}`;
  return fetchJSON(url);
}
