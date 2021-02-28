import React from 'react';
import { RiPlayCircleLine, RiPauseCircleLine } from 'react-icons/ri';
import { Container } from './parts';

type SupportedIcon = 'play-circle' | 'pause-circle';

interface Props {
  icon: SupportedIcon;
  onClick: () => void;
}

export const Icon: React.FC<Props> = ({ icon, onClick }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'play-circle':
        return <RiPlayCircleLine />;
      case 'pause-circle':
        return <RiPauseCircleLine />;
    }
  };
  return <Container onClick={onClick}>{renderIcon()}</Container>;
};

export default Icon;
