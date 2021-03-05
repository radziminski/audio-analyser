import React, { useState } from 'react';
import Box, { FlexBox } from 'components/Box';
import NavItem from 'components/NavItem';
import { NavSelector, Container } from './parts';
import { SupportedIcon } from 'components/Icon';
import { ROUTES } from 'constants/routes';

interface NavLink {
  name: string;
  linkTo: string;
  icon: SupportedIcon;
}

const NAV_LINKS: NavLink[] = [
  {
    name: 'Home',
    linkTo: ROUTES.DASHBOARD_HOME,
    icon: 'home-fill'
  },
  {
    name: 'Project',
    linkTo: ROUTES.DASHBOARD_PROJECTS,
    icon: 'projects-fill'
  },
  {
    name: 'Analyze',
    linkTo: ROUTES.DASHBOARD_ANALYSER,
    icon: 'audio'
  }
];

export const Nav: React.FC = () => {
  const [currRoute, setCurrRoute] = useState(0);

  return (
    <>
      <Container>
        {NAV_LINKS.map((link, index) => (
          <li
            key={link.name}
            onClick={() => {
              setCurrRoute(index);
            }}
          >
            <NavItem
              selected={currRoute == index}
              name={link.name}
              linkTo={link.linkTo}
              icon={link.icon}
            />
          </li>
        ))}
      </Container>
      <Box
        position='absolute'
        right={0}
        top={128 + currRoute * 58}
        transition={'all 0.15s'}
      >
        <NavSelector />
      </Box>
    </>
  );
};

export default Nav;
