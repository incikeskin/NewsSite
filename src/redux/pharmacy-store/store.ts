import { createSlice } from '@reduxjs/toolkit';
import { getPharmacyAction } from './thunks';

const initialState: any = {
  pharmacy:[],
};

export const pharmacySlice = createSlice({
  name: 'pharmacySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPharmacyAction.fulfilled, (state, action) => {
      state.pharmacy = action.payload?.result || [];
    });
  },
});
