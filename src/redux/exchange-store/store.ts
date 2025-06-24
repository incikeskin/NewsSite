import { createSlice } from '@reduxjs/toolkit';
import { getExchangeAction } from './thunks';

const initialState: any = {
  exchange:[],
};

export const exchangeSlice = createSlice({
  name: 'exchangeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExchangeAction.fulfilled, (state, action) => {
      state.exchange = action.payload || [];
    });
  },
});
