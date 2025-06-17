import type { ReduxState } from '@/src/redux';

export const toastMessageSelector = (state: ReduxState) => state.toastMessageReducer;
