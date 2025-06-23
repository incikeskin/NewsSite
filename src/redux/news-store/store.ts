import { createSlice } from '@reduxjs/toolkit';
import { getNewsAction } from './thunks';

const initialState: any = {
  news:[],
};

export const newsSlice = createSlice({
  name: 'newsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewsAction.fulfilled, (state, action) => {
      state.news = [...state.news, ...action.payload?.result];
    });
  },
});
