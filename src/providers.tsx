'use client';
import { Provider } from 'react-redux';
import { reduxStore } from './redux';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <PrimeReactProvider>
      <Provider store={reduxStore}>{props.children}</Provider>
    </PrimeReactProvider>
  );
};
