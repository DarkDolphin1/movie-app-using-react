// import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  // Check if movie is undefined or null
  if (!movie) {
    return null; // or return a placeholder/loading component
  }

  // Destructure movie properties with default values
  const {
    poster_path = '',
    title = 'Unknown Title',
    release_date = '',
    vote_average = 0,
    id = '',
  } = movie;

  // Handle missing poster image
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster'; // Fallback image

  // Format release year
  const releaseYear = release_date
    ? new Date(release_date).getFullYear()
    : 'Unknown Year';

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <img
        src={posterUrl}
        alt={title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-600">{releaseYear}</span>
          <span className="text-sm bg-yellow-400 px-2 py-1 rounded">
            ★ {vote_average.toFixed(1)} {/* Display rating with 1 decimal place */}
          </span>
        </div>
        <Link
          to={`/movie/${id}`}
          className="mt-4 block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

// Add PropTypes validation
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
};

export default MovieCard;