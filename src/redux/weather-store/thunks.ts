import api from '../../util/api';
import { createAppAsyncThunk } from '../createAppAsyncThunk';

export const getWeatherAction = createAppAsyncThunk('weather/getWeather', async (params: {city: string}) => {
  const response: any = await api.get('https://api.collectapi.com/weather/getWeather', {
    params: {
      'data.lang': 'tr',
      'data.city': params.city,
    },
  });
  console.log(response.data);
  return response.data;
});
