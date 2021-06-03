import React from 'react';
import Box from '~/components/Box';
import NavItem from '~/components/NavItem';
import { NavSelector, Container } from './parts';
import { SupportedIcon } from '~/components/Icon';
import { ROUTES } from '~/constants/routes';
import { useLocation } from 'react-router';
import { useStoreState } from '~/global-state/hooks';

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
    name: 'Projects',
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

export const Nav: React.FC = () => {
  const { pathname } = useLocation();
  const currRoute = getCurrDashboardPathIndex(pathname);

  const { currSource } = useStoreState((state) => state.audio);

  return (
    <>
      <Container>
        {NAV_LINKS.map((link, index) => (
          <li key={link.name}>
            <NavItem
              selected={currRoute === index}
              name={link.name}
              linkTo={
                link.name === 'Analyze' && currSource
                  ? link.linkTo.replace(':id', currSource)
                  : link.linkTo
              }
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
