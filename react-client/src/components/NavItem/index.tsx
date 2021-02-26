import React from 'react';
import { ReactSVG } from 'react-svg';
import { Container } from './parts';

interface Props {
  selected: boolean;
  name: string;
  linkTo: string;
  onClick: () => void;
}

export const NavItem: React.FC<Props> = ({
  name,
  selected,
  linkTo,
  onClick
}) => {
  return (
    <Container selected={selected} onClick={onClick}>
      <ReactSVG src='../../assets/home-icon.svg' />
      {name}
    </Container>
  );
};

export default NavItem;
