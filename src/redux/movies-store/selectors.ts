import type { ReduxState } from '@/src/redux';

export const moviesSelector = (state: ReduxState) => state.moviesReducer;
