import React, { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");

  // Debounce input
  useEffect(() => {
    const id = setTimeout(() => {
      onSearch(q.trim());
    }, 400);
    return () => clearTimeout(id);
  }, [q, onSearch]);

  return (
    <div className="mrapp-search-wrap">
      <input
        className="mrapp-search-input"
        placeholder="Search movies — try “inception”..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="search movies"
      />
      <div className="mrapp-search-hint">Press Enter or wait — results update automatically</div>
    </div>
  );
}
