import api from '../../util/api';
import { createAppAsyncThunk } from '../createAppAsyncThunk';

export const getMoviesAction = createAppAsyncThunk('movies/getMovies', async () => {
  const response: any = await api.get('https://api.collectapi.com/watching/moviesComing')
  console.log(response)
  return response.data;
});
