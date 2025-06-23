import api from '../../util/api';
import { createAppAsyncThunk } from '../createAppAsyncThunk';

export const getReligionAction = createAppAsyncThunk(
  'religion/getReligion',
  async (params: { city: string }) => {
    const response: any = await api.get(
      'https://api.collectapi.com/pray/all?',
      {
        params: {
          'city': params.city, // Örneğin 'istanbul'
        },

      }
    );
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  }
);
