import { createSlice } from '@reduxjs/toolkit';
import { getReligionAction } from './thunks';

const initialState: any = {
  religion:[],
};

export const religionSlice = createSlice({
  name: 'religionSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReligionAction.fulfilled, (state, action) => {
      state.religion = action.payload?.result;
    });
  },
});
