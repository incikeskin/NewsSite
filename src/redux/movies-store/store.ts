import { createSlice } from '@reduxjs/toolkit';
import { getMoviesAction } from './thunks';

const initialState: any = {
  movies:[],
};

export const moviesSlice = createSlice({
  name: 'moviesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMoviesAction.fulfilled, (state, action) => {
      state.movies = action.payload?.result || [];
    });
  },
});
