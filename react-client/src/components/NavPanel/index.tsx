import React from 'react';
import Logo from 'components/Logo';
import { Container } from './parts';
import Nav from 'components/Nav';
import Box from 'components/Box';

const NavPanel: React.FC = () => {
  return (
    <Container>
      <Box marginBottom={40} marginLeft={25}>
        <Logo />
      </Box>
      <Nav />
    </Container>
  );
};

export default NavPanel;
