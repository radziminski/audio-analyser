import React, { useState } from 'react';
import Box from 'components/Box';
import NavItem from 'components/NavItem';
import { NavSelector, Container } from './parts';
import { SupportedIcon } from 'components/Icon';
import { ROUTES } from 'constants/routes';
import { useLocation } from 'react-router';

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

const getCurrDashboardPathIndex = (path: string) => {
  const routes = path.split('/').slice(1);

  switch (routes[1]) {
    case ROUTES.DASHBOARD_ANALYSER.split('/')[2]:
      return NAV_LINKS.findIndex(
        (link) => link.linkTo === ROUTES.DASHBOARD_ANALYSER
      );
    case ROUTES.DASHBOARD_PROJECTS.split('/')[2]:
      return NAV_LINKS.findIndex(
        (link) => link.linkTo === ROUTES.DASHBOARD_PROJECTS
      );

    default:
      return 0;
  }
};

const getCurrPathIndex = (path: string) => {
  const routes = path.split('/').slice(1);
  console.log(routes[0], ROUTES.DASHBOARD.replace('/', ''));
  switch (routes[0]) {
    case ROUTES.DASHBOARD.replace('/', ''):
      return getCurrDashboardPathIndex(path);
    default:
      return 0;
  }
};

export const Nav: React.FC = () => {
  const { pathname } = useLocation();
  const [currRoute, setCurrRoute] = useState(getCurrPathIndex(pathname));

  console.log(getCurrPathIndex(pathname));

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
