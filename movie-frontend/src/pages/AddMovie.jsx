import React, { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import './AddMovie.css';

const AddMovie = () => {
  const [title, setTitle] = useState('');
  const [publishingYear, setPublishingYear] = useState('');
  const [poster, setPoster] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post('/movies', { title, publishingYear, poster })
      .then(() => navigate('/movies'))
      .catch((err) => alert(err.response?.data?.message || 'Error adding movie'));
  };

  return (
    <div className="add-container">
      <form onSubmit={handleSubmit} className="add-form">
        <h2>Add Movie</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Publishing Year"
          value={publishingYear}
          onChange={(e) => setPublishingYear(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Poster URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
