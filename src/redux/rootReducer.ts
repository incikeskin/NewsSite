import { combineReducers } from '@reduxjs/toolkit';
import { toastMessageSlice } from '@/src/redux/toastMessage-store';
export const rootReducer = combineReducers({
  toastMessageReducer: toastMessageSlice.reducer,
  
});
