import { screen } from '@testing-library/react';
import React from 'react';

import { renderWithTheme } from '~/.jest/helpers';

import Button from '.';

describe('ActionButton', () => {
  it('renders inside DOM', () => {
    const text = 'Hello!';
    renderWithTheme(<Button>{text}</Button>);

    const buttonElement = screen.getByRole('button', { name: text });
    expect(buttonElement).toBeInTheDocument();
  });
});
