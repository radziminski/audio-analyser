import React, { useState } from 'react';
import Box, { FlexBox } from 'components/Box';
import NavItem from 'components/NavItem';
import { NavSelector } from './parts';

interface NavLink {
  name: string;
  linkTo: string;
}

const NAV_LINKS: NavLink[] = [
  {
    name: 'Home',
    linkTo: '/'
  },
  {
    name: 'Project',
    linkTo: '/'
  },
  {
    name: 'Analyze',
    linkTo: '/'
  }
];

export const Nav: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  return (
    <>
      <FlexBox flexDirection='column'>
        {NAV_LINKS.map((link, index) => (
          <NavItem
            selected={selectedItem == index}
            key={link.name}
            name={link.name}
            linkTo={link.linkTo}
            onClick={() => {
              setSelectedItem(index);
            }}
          />
        ))}
      </FlexBox>
      <Box
        position='absolute'
        right={0}
        top={128 + selectedItem * 58}
        transition={'all 0.15s'}
      >
        <NavSelector />
      </Box>
    </>
  );
};

export default Nav;
