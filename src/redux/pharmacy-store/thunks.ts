import api from '../../util/api';
import { createAppAsyncThunk } from '../createAppAsyncThunk';

export const getPharmacyAction = createAppAsyncThunk(
  'pharmacy/getPharmacy',
  async (params: { il: string; ilce: string }) => {
    console.log('API çağrısı params:', params);
    const response: any = await api.get('https://api.collectapi.com/health/dutyPharmacy', {
      params: {
        il: params.il,
        ilce: params.ilce,
      },
    });
    console.log(response);
    return response.data;
  }
);

