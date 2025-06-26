import type { ReduxState } from '@/src/redux';

export const weatherSelector = (state: ReduxState) => state.weatherReducer;
