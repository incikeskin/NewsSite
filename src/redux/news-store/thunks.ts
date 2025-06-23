import api from '../../util/api';
import { createAppAsyncThunk } from '../createAppAsyncThunk';

export const getNewsAction = createAppAsyncThunk('news/getNews', async (params: any) => {
  const response: any = await api.get('https://api.collectapi.com/news/getNews?country=tr&tag=general',{params})
  console.log(response)
  return response.data;
});
