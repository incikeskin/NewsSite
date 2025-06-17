import { configureStore } from '@reduxjs/toolkit';
import { useSelector as useReduxSelector, type TypedUseSelectorHook } from 'react-redux';
import { rootReducer } from './rootReducer';

export const reduxStore = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export const useAppSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
