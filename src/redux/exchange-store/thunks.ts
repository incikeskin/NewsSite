import api from '../../util/api';
import { createAppAsyncThunk } from '../createAppAsyncThunk';

export const getExchangeAction = createAppAsyncThunk(
  'exchange/getExchange',
  async (params: { base: string; to: string; int?: number }) => {
    const response: any = await api.get(
      'https://api.collectapi.com/economy/exchange',
      { params }
    );
    console.log(response);
    return response.data.result.data;
  }
);
