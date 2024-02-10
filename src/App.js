import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const searchMovies = async (query) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=d9cbacd0f5c84157c6eda8696ca160d0&query=${query}`
    );
    setMovies(response.data.results);
  };

  const fetchMovieDetails = async (id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=d9cbacd0f5c84157c6eda8696ca160d0`
    );
    setSelectedMovie(response.data);
  };

  const addToFavorites = (movie) => {
    setFavoriteMovies([...favoriteMovies, movie]);
  };

  const removeFromFavorites = (id) => {
    setFavoriteMovies(favoriteMovies.filter((movie) => movie.id !== id));
  };

  return (
    <div className="App">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search movies..."
      />
      <button onClick={() => searchMovies(searchTerm)}>Search</button>

      <div className="movies">
        {movies.map((movie) => (
          <div key={movie.id} onClick={() => fetchMovieDetails(movie.id)}>
            <h2>{movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <button onClick={(e) => {e.stopPropagation(); addToFavorites(movie);}}>Add to favorites</button>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="movie-details">
          <h2>{selectedMovie.title}</h2>
          <img src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`} alt={selectedMovie.title} />
          <p>{selectedMovie.overview}</p>
          <p>Genre: {selectedMovie.genres.map((genre) => genre.name).join(', ')}</p>
          <p>Runtime: {selectedMovie.runtime} minutes</p>
          <p>Rating: {selectedMovie.vote_average}</p>
          <button onClick={() => removeFromFavorites(selectedMovie.id)}>Remove from favorites</button>
        </div>
      )}

      <div className="favorite-movies">
        <h2>Favorite Movies</h2>
        {favoriteMovies.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;