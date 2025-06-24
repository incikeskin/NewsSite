import { combineReducers } from '@reduxjs/toolkit';
import { toastMessageSlice } from '@/src/redux/toastMessage-store';
import { newsSlice } from '@/src/redux/news-store';
import { weatherSlice } from '@/src/redux/weather-store';
import { religionSlice} from '@/src/redux/religion-store';
import { moviesSlice } from '@/src/redux/movies-store';
import { pharmacySlice } from '@/src/redux/pharmacy-store';
import { exchangeSlice } from '@/src/redux/exchange-store';
import { goldSlice } from '@/src/redux/gold-store';


export const rootReducer = combineReducers({
  toastMessageReducer: toastMessageSlice.reducer,
  newsReducer: newsSlice.reducer,
  weatherReducer: weatherSlice.reducer,
  religionReducer: religionSlice.reducer,
  moviesReducer: moviesSlice.reducer,
  pharmacyReducer: pharmacySlice.reducer,
  exchangeReducer: exchangeSlice.reducer,
  goldReducer: goldSlice.reducer,
});
