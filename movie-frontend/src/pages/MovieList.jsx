import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import './MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1); // optional if backend returns total count
  const navigate = useNavigate();

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/movies?page=${page}&limit=6`);
      let movieData = [];

      // Safely check response structure
      if (Array.isArray(res.data)) {
        movieData = res.data;
      } else if (res.data && Array.isArray(res.data.data)) {
        movieData = res.data.data;
      } else {
        movieData = [];
      }

      setMovies(movieData);

      // Optional: calculate total pages if backend returns total count
      if (res.data && res.data.total) {
        setTotalPages(Math.ceil(res.data.total / 6));
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/movies/${id}`);
      setMovies((prev) => prev.filter((movie) => movie._id !== id));
    } catch (err) {
      console.error('Failed to delete movie:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container">
      <div className="movie-header">
        <h1>Movie List</h1>
        <Link to="/add-movie" className="add-btn">
          + Add Movie
        </Link>
      </div>

      {loading ? (
        <p>Loading movies...</p>
      ) : movies.length === 0 ? (
        <p>No movies available.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          disabled={page === 1 || loading}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span> Page {page} </span>
        <button
          disabled={loading || (totalPages && page >= totalPages)}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default MovieList;
