import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, onDelete }) => {
  return (
    <div className="movie-card">
      {movie.poster && (
        <img src={movie.poster} alt={movie.title} className="poster" />
      )}
      <h3>{movie.title}</h3>
      <p>Year: {movie.publishingYear}</p>
      <button onClick={() => onDelete(movie._id)}>Delete</button>
    </div>
  );
};

export default MovieCard;
