import { createSlice } from '@reduxjs/toolkit';
import { getWeatherAction } from './thunks';


const initialState: any = {
  weather:[],
};

export const weatherSlice = createSlice({
  name: 'weatherSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWeatherAction.fulfilled, (state, action) => {
      state.weather = action.payload?.result || [];
    });
  },
});

