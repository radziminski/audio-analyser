import React from 'react';
import Box from 'components/Box';
import styled from 'styled-components';

export const NavSelector: React.FC = () => {
  return (
    <Box width={30} overflow='hidden'>
      <NavSelectorContent>
        <NavSelectorBall />
      </NavSelectorContent>
    </Box>
  );
};

export const NavSelectorContent = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background50};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavSelectorBall = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 34px;
  background: ${({ theme }) => theme.colors.accentPrimary100};
`;
