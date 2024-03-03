import {createSlice} from '@reduxjs/toolkit';
import {MovieDetails} from '../models/ResponseType';

export interface movieInterface {
  movieItem: MovieDetails | null;
}

const initialState: movieInterface = {
  movieItem: null,
};

export const MovieReducers = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Defining the 'storeMovieInfo' action to update the 'movieItem' state
    storeMovieInfo: (state, action) => {
      state.movieItem = action.payload;
    },
  },
});

export const {storeMovieInfo} = MovieReducers.actions;
export default MovieReducers.reducer;
