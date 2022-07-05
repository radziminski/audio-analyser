import React from 'react';
import { Link } from 'react-router-dom';

import Box from '~/components/Box';
import Icon, { SupportedIcon } from '~/components/Icon';

import { Container } from './parts';

interface Props {
  selected: boolean;
  name: string;
  linkTo: string;
  onClick?: () => void;
  icon?: SupportedIcon;
}

export const NavItem: React.FC<Props> = ({
  name,
  selected,
  linkTo,
  icon,
  onClick
}) => {
  return (
    <Link to={linkTo}>
      <Container selected={selected} onClick={onClick}>
        {icon && (
          <Box color='white' marginRight='26px'>
            <Icon icon={icon} size={24} />
          </Box>
        )}
        {name}
      </Container>
    </Link>
  );
};

export default NavItem;
