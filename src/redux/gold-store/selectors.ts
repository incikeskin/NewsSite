import type { ReduxState } from '@/src/redux';

export const goldSelector = (state: ReduxState) => state.goldReducer;
