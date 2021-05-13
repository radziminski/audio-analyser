import React from 'react';
import Logo from '~/components/Logo';
import { Container } from './parts';
import Nav from '~/components/Nav';
import Box, { FlexBox } from '~/components/Box';
import AccountBar from '~/components/AccountBar';

const NavPanel: React.FC = () => {
  return (
    <Container>
      <Box marginBottom={40} marginLeft={25}>
        <Logo />
      </Box>
      <Nav />
      <FlexBox
        position='absolute'
        left={0}
        bottom={0}
        width='100%'
        height='100px'
        padding='0 46px'
        justifyContent='flex-start'
        alignItems='center'
        borderTop='2px solid rgba(255,255,255,0.1)'
      >
        <AccountBar />
      </FlexBox>
    </Container>
  );
};

export default NavPanel;
