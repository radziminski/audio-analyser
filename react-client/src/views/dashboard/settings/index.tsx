import React from 'react';
import ActionButton from '~/components/ActionButton';
import Box, { FlexBox } from '~/components/Box';
import DashboardContent from '~/components/DashboardContent';
import { Heading5 } from '~/components/Text';
import { useStoreActions, useStoreState } from '~/global-state/hooks';
import { COLORS, FONT_WEIGHTS } from '~/styles/theme';
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
    bands: { isChromaOpened, isMfccOpened },
    coefficients: {
      isOpened: isCoefficientsOpened,
      isRmsShown,
      isRolloffShown,
      isCentroidShown,
      height: coefficientsHeight,
      bufferSize: coefficientsBufferSize
    }
  } = useStoreState((state) => state.ui.audioUIState);

  const {
    setWaveformState,
    setFrequencyState,
    setVolumeState,
    setBandsState,
    setSpectrogramState,
    setCoefficientsState,
    resetToDefault
  } = useStoreActions((state) => state.ui);

  const openedWidgetsNum = [
    isWaveformOpened,
    isFrequencyOpened,
    isSpectrogramOpened,
    isChromaOpened,
    isMfccOpened,
    isVolumeOpened,
    isCoefficientsOpened
  ].filter((v) => !!v).length;

  const waveformSettings = (
    <SectionWithTitle
      title='Audio Waveform'
      description='The audio waveform visualization working as an audio player'
    >
      <ToggleInputBox
        title='Waveform shown'
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
      description='The visualization of loudness of the audio'
    >
      <ToggleInputBox
        title='Volume Meter shown'
        value={isVolumeOpened}
        onChange={(isOpened) => setVolumeState({ isOpened })}
      />
      <SlideInputBox
        title='Instantaneous (filled bars) buffer size'
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
        title='Average maximum (red lines) buffer size'
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
    <SectionWithTitle
      title='Frequency chart'
      description='The graph visualizing loudness of different frequencies of the audio'
    >
      <ToggleInputBox
        title='Frequency chart shown'
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
        title='Frequency chart height'
        value={frequencyHeight}
        min={100}
        max={MAX_WIDGET_HEIGHT}
        step={WIDGET_HEIGHT_STEP}
        onChange={(height) => setFrequencyState({ height })}
        unit='px'
      />
    </SectionWithTitle>
  );

  const spectrogramSettings = (
    <SectionWithTitle
      title='Spectrogram'
      description='Graph visualizing the loudness of different frequencies over time'
    >
      <ToggleInputBox
        title='Spectrogram shown'
        value={isSpectrogramOpened}
        onChange={(isOpened) => setSpectrogramState({ isOpened })}
      />
      <SlideInputBox
        title='Spectrogram height'
        value={spectrogramHeight}
        min={MIN_WIDGET_HEIGHT}
        max={MAX_WIDGET_HEIGHT}
        step={WIDGET_HEIGHT_STEP}
        onChange={(height) => setSpectrogramState({ height })}
        unit='px'
      />
    </SectionWithTitle>
  );

  const bandsSettings = (
    <SectionWithTitle
      title='Chroma & MFCC bands'
      description='Chroma and MFCC bands settings'
    >
      <ToggleInputBox
        title='Chroma bands shown'
        value={isChromaOpened}
        onChange={(isChromaOpened) => setBandsState({ isChromaOpened })}
      />
      <ToggleInputBox
        title='MFCC bands shown'
        value={isMfccOpened}
        onChange={(isMfccOpened) => setBandsState({ isMfccOpened })}
      />
    </SectionWithTitle>
  );

  const coefficientsSettings = (
    <SectionWithTitle
      title='RMS, Spectral Centroid & Spectral Rolloff'
      description='RMS, Spectral Centroid & Spectral Rolloff graph settings'
    >
      <ToggleInputBox
        title='Graph shown'
        value={isCoefficientsOpened}
        onChange={(isOpened) => setCoefficientsState({ isOpened })}
      />
      <ToggleInputBox
        title='RMS values shown'
        value={isRmsShown}
        onChange={(isRmsShown) => setCoefficientsState({ isRmsShown })}
      />
      <ToggleInputBox
        title='Spectral Rolloff values shown'
        value={isRolloffShown}
        onChange={(isRolloffShown) => setCoefficientsState({ isRolloffShown })}
      />
      <ToggleInputBox
        title='Spectral Centroid values shown'
        value={isCentroidShown}
        onChange={(isCentroidShown) =>
          setCoefficientsState({ isCentroidShown })
        }
      />
      <SlideInputBox
        title='Graph height'
        value={coefficientsHeight}
        min={MIN_WIDGET_HEIGHT}
        max={MAX_WIDGET_HEIGHT}
        step={WIDGET_HEIGHT_STEP}
        onChange={(height) => setCoefficientsState({ height })}
        unit='px'
      />
      <SlideInputBox
        title='Buffer size'
        value={Math.log2(coefficientsBufferSize)}
        min={8}
        max={14}
        step={1}
        onChange={(power) =>
          setCoefficientsState({ bufferSize: Math.pow(2, power) })
        }
        displayedValue={coefficientsBufferSize.toString()}
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

      {openedWidgetsNum > 4 && (
        <Box marginBottom='2rem' maxWidth='1000px'>
          <Heading5
            color={COLORS.accentSecondary100}
            fontWeight={FONT_WEIGHTS.normal}
          >
            Warning: If you experience frame drops and performance loss while
            running analyzer, try disabling some of th widgets here. It is not
            recommended to have more than 4 widgets opened, unless a powerful
            CPU is available.
          </Heading5>
        </Box>
      )}

      <FlexBox justifyContent='space-between' width='100%' flexWrap='wrap'>
        {waveformSettings}
        {volumeSettings}
        {frequencySettings}
        {spectrogramSettings}
        {bandsSettings}
        {coefficientsSettings}
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
