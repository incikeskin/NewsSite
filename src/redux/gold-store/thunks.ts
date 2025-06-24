import api from '../../util/api';
import { createAppAsyncThunk } from '../createAppAsyncThunk';

export const getGoldAction = createAppAsyncThunk('gold/getGold', async () => {
  const response: any = await api.get('https://api.collectapi.com/economy/goldPrice')
  console.log(response)
  return response.data;
});

