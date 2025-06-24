import type { ReduxState } from '@/src/redux';

export const pharmacySelector = (state: ReduxState) => state.pharmacyReducer;
