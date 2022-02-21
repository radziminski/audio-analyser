import { StoreProvider } from 'easy-peasy';
import React from 'react';
import ReactDOM from 'react-dom';

import initStore from '~/global-state';

import App from './App';

const store = initStore();

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
