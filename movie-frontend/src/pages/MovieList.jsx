import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import './MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();


//   useEffect(() => {
//     api.get('/movies').then((res) => setMovies(res.data));
//   }, []);

useEffect(() => {
  api.get(`/movies?page=${page}&limit=6`).then((res) => setMovies(res.data));
}, [page]);

  const handleDelete = (id) => {
    api.delete(`/movies/${id}`).then(() =>
      setMovies((prev) => prev.filter((movie) => movie._id !== id))
    );
  };

  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};


  return (
    <div className="container">
      <div className="movie-header">
        <h1>Movie List</h1>
        <Link to="/add-movie" className="add-btn">
          + Add Movie
        </Link>
      </div>
      <div className="movie-grid">
        {movies.length === 0 ? (
          <p>No movies available.</p>
        ) : (
          movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} onDelete={handleDelete} />
          ))
        )}
      </div>
      <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
            <span> Page {page} </span>
            <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
      <button onClick={handleLogout} className="logout-btn">
            Logout
       </button>

    </div>
  );
};

export default MovieList;
