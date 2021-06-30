import React from 'react';
import ActionButton from '~/components/ActionButton';
import Box, { FlexBox } from '~/components/Box';
import DashboardContent from '~/components/DashboardContent';
import { useStoreActions, useStoreState } from '~/global-state/hooks';
import { SectionWithTitle, SlideInputBox, ToggleInputBox } from './parts';

const MAX_WIDGET_HEIGHT = 1000;
const MIN_WIDGET_HEIGHT = 50;
const WIDGET_HEIGHT_STEP = 20;

export const SettingsView: React.FC = () => {
  const {
    waveform: {
      barWidth,
      barSpacing,
      height: waveformHeight,
      isOpened: isWaveformOpened
    },
    volume: {
      isOpened: isVolumeOpened,
      instantaneousBufferSize,
      averageBufferSize
    },
    frequency: {
      isOpened: isFrequencyOpened,
      bufferSize: fftSize,
      height: frequencyHeight
    },
    spectrogram: { isOpened: isSpectrogramOpened, height: spectrogramHeight },
    singleParams: { isChromaOpened, isMfccOpened }
  } = useStoreState((state) => state.ui.audioUIState);

  const {
    setWaveformState,
    setFrequencyState,
    setVolumeState,
    setSingleParamsState,
    setSpectrogramState,
    resetToDefault
  } = useStoreActions((state) => state.ui);

  const waveformSettings = (
    <SectionWithTitle
      title='Audio Waveform'
      description='The audio waveform visualization working as an audio player'
    >
      <ToggleInputBox
        title='Waveform shown: '
        value={isWaveformOpened}
        onChange={(isOpened) => setWaveformState({ isOpened })}
      />
      <SlideInputBox
        title='Single Bar Width'
        value={barWidth}
        min={1}
        max={50}
        step={1}
        onChange={(barWidth) => setWaveformState({ barWidth })}
        unit='px'
      />
      <SlideInputBox
        title='Bars Spacing'
        value={barSpacing}
        min={0}
        max={10}
        step={1}
        onChange={(barSpacing) => setWaveformState({ barSpacing })}
        unit='px'
      />
      <SlideInputBox
        title='Waveform height'
        value={waveformHeight}
        min={MIN_WIDGET_HEIGHT}
        max={MAX_WIDGET_HEIGHT}
        step={WIDGET_HEIGHT_STEP}
        onChange={(height) => setWaveformState({ height })}
        unit='px'
      />
    </SectionWithTitle>
  );

  const volumeSettings = (
    <SectionWithTitle
      title='Volume Meter'
      description='The vertical visualization of loudness of the audio'
    >
      <ToggleInputBox
        title='Volume Meter shown: '
        value={isVolumeOpened}
        onChange={(isOpened) => setVolumeState({ isOpened })}
      />
      <SlideInputBox
        title='Instantaneous volume buffer size'
        value={Math.log2(instantaneousBufferSize)}
        min={9}
        max={14}
        step={1}
        onChange={(power) =>
          setVolumeState({ instantaneousBufferSize: Math.pow(2, power) })
        }
        displayedValue={instantaneousBufferSize.toString()}
      />
      <SlideInputBox
        title='Average volume buffer size'
        value={Math.log2(averageBufferSize)}
        min={9}
        max={14}
        step={1}
        onChange={(power) =>
          setVolumeState({ averageBufferSize: Math.pow(2, power) })
        }
        displayedValue={averageBufferSize.toString()}
      />
    </SectionWithTitle>
  );
  const frequencySettings = (
    <SectionWithTitle title='Frequency chart' description='todo'>
      <ToggleInputBox
        title='Frequency chart shown: '
        value={isFrequencyOpened}
        onChange={(isOpened) => setFrequencyState({ isOpened })}
      />
      <SlideInputBox
        title='FFT size'
        value={Math.log2(fftSize)}
        min={9}
        max={14}
        step={1}
        onChange={(power) =>
          setFrequencyState({ bufferSize: Math.pow(2, power) })
        }
        displayedValue={fftSize.toString()}
      />
      <SlideInputBox
        title='Frequency chart height:'
        value={frequencyHeight}
        min={MIN_WIDGET_HEIGHT}
        max={MAX_WIDGET_HEIGHT}
        step={WIDGET_HEIGHT_STEP}
        onChange={(height) => setFrequencyState({ height })}
        unit='px'
      />
    </SectionWithTitle>
  );

  const spectrogramSettings = (
    <SectionWithTitle title='Spectrogram' description='todo'>
      <ToggleInputBox
        title='Spectrogram shown: '
        value={isSpectrogramOpened}
        onChange={(isOpened) => setSpectrogramState({ isOpened })}
      />
      <SlideInputBox
        title='Spectrogram height:'
        value={spectrogramHeight}
        min={MIN_WIDGET_HEIGHT}
        max={MAX_WIDGET_HEIGHT}
        step={WIDGET_HEIGHT_STEP}
        onChange={(height) => setSpectrogramState({ height })}
        unit='px'
      />
    </SectionWithTitle>
  );

  const otherSettings = (
    <SectionWithTitle title='Other parameters' description='todo'>
      <ToggleInputBox
        title='Chroma bands shown: '
        value={isChromaOpened}
        onChange={(isChromaOpened) => setSingleParamsState({ isChromaOpened })}
      />
      <ToggleInputBox
        title='MFCC bands shown: '
        value={isMfccOpened}
        onChange={(isMfccOpened) => setSingleParamsState({ isMfccOpened })}
      />
    </SectionWithTitle>
  );

  return (
    <DashboardContent
      title={'Settings'}
      subTitles={[
        'Here you can modify the default settings for analyser widgets'
      ]}
      canGoBack
    >
      <Box height='1rem' />

      <FlexBox justifyContent='space-between' width='100%' flexWrap='wrap'>
        {waveformSettings}
        {volumeSettings}
        {frequencySettings}
        {spectrogramSettings}
        {otherSettings}
      </FlexBox>

      <FlexBox justifyContent='center' width='100%'>
        <Box width='200px'>
          <ActionButton
            padding='0.5rem 1rem'
            height='2.5rem'
            fontSize='0.8rem'
            onClick={() => resetToDefault()}
          >
            Reset settings to default
          </ActionButton>
        </Box>
      </FlexBox>
    </DashboardContent>
  );
};

export default SettingsView;
