import type { ReduxState } from '@/src/redux';

export const exchangeSelector = (state: ReduxState) => state.exchangeReducer;
