import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../store/MovieSlice';

const FilterBar = () => {
  const dispatch = useDispatch();
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');

  const handleFilter = () => {
    dispatch(fetchMovies({ genre, sortBy }));
  };

  return (
    <div className="mb-8">
      <div className="flex gap-4">
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Genres</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
          <option value="27">Horror</option>
          <option value="10749">Romance</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="popularity.desc">Popularity</option>
          <option value="release_date.desc">Release Date</option>
          <option value="vote_average.desc">Rating</option>
        </select>

        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;