import { createSlice } from '@reduxjs/toolkit';
import { getGoldAction } from './thunks';

const initialState: any = {
  gold:[],
};

export const goldSlice = createSlice({
  name: 'goldSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGoldAction.fulfilled, (state, action) => {
      state.gold = action.payload?.result || [];
    });
  },
});
