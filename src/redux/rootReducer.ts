import { combineReducers } from '@reduxjs/toolkit';
import { toastMessageSlice } from '@/src/redux/toastMessage-store';
import { newsSlice } from '@/src/redux/news-store';
import { weatherSlice } from '@/src/redux/weather-store';
import { religionSlice} from '@/src/redux/religion-store';


export const rootReducer = combineReducers({
  toastMessageReducer: toastMessageSlice.reducer,
  newsReducer: newsSlice.reducer,
  weatherReducer: weatherSlice.reducer,
  religionReducer: religionSlice.reducer,
});
