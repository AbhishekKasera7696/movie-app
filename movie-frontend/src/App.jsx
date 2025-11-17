
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MovieList from './pages/MovieList';
import AddMovie from './pages/AddMovie';
import Register from './pages/Register';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/movies"
          element={
            <PrivateRoute>
              <MovieList />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-movie"
          element={
            <PrivateRoute>
              <AddMovie />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

