import React from 'react';
import {
  RiPlayCircleLine,
  RiPauseCircleLine,
  RiUser3Fill,
  RiHome5Fill,
  RiFolderMusicFill,
  RiBarChartBoxFill,
  RiVolumeUpFill,
  RiVolumeDownFill,
  RiVolumeMuteFill,
  RiRewindFill,
  RiSpeedFill
} from 'react-icons/ri';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
// import { AiFillHome } from 'react-icons/ai';
// import { IoIosCreate } from 'react-icons/io';
// import { GiSoundWaves } from 'react-icons/gi';
import { Container } from './parts';

export type SupportedIcon =
  | 'play-circle'
  | 'pause-circle'
  | 'user-fill'
  | 'arrow-down-fill'
  | 'arrow-up-fill'
  | 'home-fill'
  | 'projects-fill'
  | 'audio'
  | 'volume-mute-fill'
  | 'volume-up-fill'
  | 'volume-down-fill'
  | 'skip-forward-fill'
  | 'skip-backward-fill';

export interface Props {
  icon: SupportedIcon;
  size?: number;
  onClick?: () => void;
}

export const Icon: React.FC<Props> = ({ icon, size, onClick }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'play-circle':
        return <RiPlayCircleLine />;
      case 'pause-circle':
        return <RiPauseCircleLine />;
      case 'user-fill':
        return <RiUser3Fill />;
      case 'arrow-down-fill':
        return <TiArrowSortedDown />;
      case 'arrow-up-fill':
        return <TiArrowSortedUp />;
      case 'home-fill':
        return <RiHome5Fill />;
      case 'projects-fill':
        return <RiFolderMusicFill />;
      case 'audio':
        return <RiBarChartBoxFill />;
      case 'volume-mute-fill':
        return <RiVolumeMuteFill />;
      case 'volume-up-fill':
        return <RiVolumeUpFill />;
      case 'volume-down-fill':
        return <RiVolumeDownFill />;
      case 'skip-backward-fill':
        return <RiRewindFill />;
      case 'skip-forward-fill':
        return <RiSpeedFill />;
    }
  };
  return (
    <Container size={size} onClick={onClick}>
      {renderIcon()}
    </Container>
  );
};

export default Icon;
