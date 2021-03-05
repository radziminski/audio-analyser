import Box, { FlexBox } from 'components/Box';
import SliderPrimary from 'components/SliderPrimary';
import Icon, { SupportedIcon } from 'components/Icon';
import React, { useCallback, useMemo, useState } from 'react';
import { useStoreState } from 'global-state/hooks';

export const VolumeSlider: React.FC = () => {
  const [gainValue, setGainValue] = useState(1);
  const [prevGainValue, setPrevGainValue] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const { controller } = useStoreState((state) => state.audio);

  const onVolumeChange = useCallback(
    (value: number) => {
      if (controller) controller.masterGainNode.gain.value = value;
      setGainValue(value);
      setIsMuted(false);
    },
    [controller, setGainValue]
  );

  const muteVolume = () => {
    setPrevGainValue(gainValue);
    setIsMuted(true);
    if (controller) controller.masterGainNode.gain.value = 0;
    return setGainValue(0);
  };
  const unMuteVolume = () => {
    setIsMuted(false);
    if (controller) controller.masterGainNode.gain.value = prevGainValue;
    setGainValue(prevGainValue);
  };

  const onMute = () => {
    if (isMuted) {
      return unMuteVolume();
    }

    return muteVolume();
  };

  const icon: SupportedIcon = useMemo(() => {
    if (gainValue === 0) return 'volume-mute-fill';
    if (gainValue < 0.6) return 'volume-down-fill';
    return 'volume-up-fill';
  }, [gainValue]);

  return (
    <FlexBox alignItems='center'>
      <Box marginRight='15px' cursor='pointer' onClick={onMute}>
        <Icon icon={icon} size={24} />
      </Box>
      <SliderPrimary
        min={0}
        max={1}
        value={gainValue}
        step={0.05}
        onChange={onVolumeChange}
      />
    </FlexBox>
  );
};

export default VolumeSlider;
