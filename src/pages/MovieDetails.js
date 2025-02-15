import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../store/MovieSlice';

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieDetails, status } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="w-full md:w-1/3 rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{movieDetails.title}</h1>
          <p className="text-gray-600 mb-4">{movieDetails.overview}</p>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm bg-yellow-400 px-2 py-1 rounded">
              ★ {movieDetails.vote_average}
            </span>
            <span className="text-sm text-gray-600">
              Release Date: {new Date(movieDetails.release_date).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;