import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_KEY;

// Fetch popular movies or filtered movies
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ genre = '', sortBy = 'popularity.desc' } = {}) => {
    const response = await axios.get(
      `${API_URL}/discover/movie?api_key=${API_KEY}&sort_by=${sortBy}&with_genres=${genre}`
    );
    return response.data.results;
  }
);

// Search movies by query
export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (query) => {
    const response = await axios.get(
      `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );
    return response.data.results;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(searchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;