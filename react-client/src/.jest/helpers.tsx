import {
  Queries,
  render,
  queries,
  RenderOptions
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React from 'react';

import { defaultTheme } from '../styles/theme';
import initStore from '~/global-state';
import { StoreProvider } from 'easy-peasy';

const store = initStore();

export const renderWithTheme = <
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement
>(
  ui: React.ReactNode,
  theme = defaultTheme,
  options?: RenderOptions<Q, Container>
) => {
  const element = <ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>;

  if (options) {
    return render(element, options);
  }

  return render(element);
};

export const renderWithStore = <
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement
>(
  ui: React.ReactNode,
  options?: RenderOptions<Q, Container>
) => {
  const element = <StoreProvider store={store}>{ui}</StoreProvider>;

  if (options) {
    return render(element, options);
  }

  return render(element);
};

export const renderWithProviders = (ui: React.ReactNode) => {
  return renderWithTheme(
    <StoreProvider store={store}>
      <ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>
    </StoreProvider>
  );
};
