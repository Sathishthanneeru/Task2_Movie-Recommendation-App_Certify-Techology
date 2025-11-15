import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="mrapp-navbar">
      <div className="mrapp-nav-inner">
        <Link to="/" className="mrapp-brand">MovieLab 🎬</Link>
        <div className="mrapp-nav-right">
          <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" className="mrapp-small">TMDB</a>
        </div>
      </div>
    </nav>
  );
}
