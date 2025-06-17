import { createSlice } from '@reduxjs/toolkit';
import { setToastMessage } from './thunks';

const initialState: any = {
  toastMessage: {
    show: false,
    severity: 'success',
    summary: 'Başarılı',
    detail: '',
  },
  news:[]
};

export const toastMessageSlice = createSlice({
  name: 'toastMessageSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setToastMessage.fulfilled, (state, action) => {
      state.toastMessage = action.payload;
    });
  },
});
