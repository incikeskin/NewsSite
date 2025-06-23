import type { ReduxState } from '@/src/redux';

export const newsSelector = (state: ReduxState) => state.newsReducer;
