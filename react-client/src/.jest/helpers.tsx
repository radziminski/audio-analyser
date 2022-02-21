import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import React from 'react';

import { defaultTheme } from '../styles/theme';

export const renderWithTheme = (ui, theme = defaultTheme, options?: any) => {
  return render(
    <ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>,
    options
  );
};
