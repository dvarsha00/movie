import React from "react";

const FavoritesPage = ({ favoriteMovies, removeFromFavorites }) => (
  <div>
    <h2>Favorite Movies</h2>
    <div className="favorite-movies">
      {favoriteMovies.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <button onClick={() => removeFromFavorites(movie.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default FavoritesPage;
