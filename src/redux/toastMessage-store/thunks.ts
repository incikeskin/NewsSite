import { createAppAsyncThunk } from '../createAppAsyncThunk';

export const setToastMessage = createAppAsyncThunk('set/toastMessage', async (params: any) => {
  return {
    show: params.show,
    severity: params.severity,
    summary: params.summary,
    detail: params.detail,
  };
});
