import React, { useState } from 'react';
import Box, { FlexBox } from 'components/Box';
import NavItem from 'components/NavItem';
import { NavSelector } from './parts';
import { SupportedIcon } from 'components/Icon';

interface NavLink {
  name: string;
  linkTo: string;
  icon: SupportedIcon;
}

const NAV_LINKS: NavLink[] = [
  {
    name: 'Home',
    linkTo: '/',
    icon: 'home-fill'
  },
  {
    name: 'Project',
    linkTo: '/',
    icon: 'projects-fill'
  },
  {
    name: 'Analyze',
    linkTo: '/',
    icon: 'audio'
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
            icon={link.icon}
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
