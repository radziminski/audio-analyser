import { fireEvent, screen, within } from '@testing-library/react';
import React from 'react';

import { renderWithProviders } from '~/.jest/helpers';

import AccountBar from '..';

describe('AccountBar', () => {
  it('opens a tooltip with logout button when clicked', () => {
    renderWithProviders(<AccountBar />);

    const accountButton = screen.getByRole('button', { name: /Welcome .*/i });
    expect(accountButton).toBeInTheDocument();

    fireEvent.click(accountButton);

    const tooltipContainer = screen.getByRole('tooltip');
    const logoutButton = within(tooltipContainer).getByRole('button', {
      name: /Logout/i
    });

    expect(tooltipContainer).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
});
