import React, { useMemo, useEffect, useState } from 'react';
import VolumeMeter from 'components/VolumeMeter';
import Waveform from 'components/Waveform';
import FrequencyMeter from 'components/FrequencyMeter';
import { useStoreState, useStoreActions } from 'global-state/hooks';
import { usePlayOnSpace } from 'hooks/usePlayOnSpace';
import DashboardContent from 'components/DashboardContent';
import AudioService from 'services/AudioControllerService';
import { useParams } from 'react-router';
import Box, { FlexBox } from 'components/Box';
import Spectrogram from 'components/Spectrogram';
import { Heading2, Heading3 } from 'components/Text';
import { COLORS } from 'styles/theme';
import Anchor from 'components/Anchor';
import { ROUTES } from 'constants/routes';
import Loader from 'components/Loader';

export const AnalyserView: React.FC = () => {
  const [audioLoaded, setAudioLoaded] = useState(false);

  const {
    isLoadingAudioBuffer,
    didLoadAudioBuffer,
    isPlaying,
    currSource,
    audioSources
  } = useStoreState((state) => state.audio);

  const { id: srcId } = useParams<{ id: string }>();

  const {
    loadAudioBuffer,
    play,
    pause,
    loadAudio,
    setCurrSource
  } = useStoreActions((actions) => actions.audio);

  usePlayOnSpace(
    () => play(),
    () => pause(),
    isPlaying
  );

  useEffect(() => {
    const setAudioLoadedFunction = () => setAudioLoaded(true);

    if (srcId && audioSources[srcId]) {
      const src = audioSources[srcId];
      setCurrSource(srcId);
      loadAudio(src);
      AudioService.audioElement.addEventListener(
        'canplay',
        setAudioLoadedFunction
      );
    }

    return () =>
      AudioService.audioElement.removeEventListener(
        'canplay',
        setAudioLoadedFunction
      );
  }, [srcId, audioSources, loadAudio, setCurrSource]);

  const srcExists = currSource || (srcId && audioSources[srcId]);

  useEffect(() => {
    if (!currSource) return;

    loadAudioBuffer();
    setAudioLoaded(true);
  }, [currSource, loadAudioBuffer]);

  const content = useMemo(() => {
    if (
      !AudioService.audioElement ||
      isLoadingAudioBuffer ||
      !didLoadAudioBuffer ||
      !AudioService ||
      !audioLoaded
    )
      return (
        <FlexBox
          width='100%'
          height='100%'
          justifyContent='center'
          alignItems='center'
          paddingBottom='150px'
        >
          <Loader />
        </FlexBox>
      );

    return (
      <>
        <Waveform
          audioBuffer={AudioService?.buffer}
          isLoadingAudioBuffer={isLoadingAudioBuffer ?? false}
          didLoadAudioBuffer={didLoadAudioBuffer ?? false}
          barMinHeight={1}
          barWidth={4}
          barSpacing={1}
          height={150}
          barBorderRadius={8}
          audioElement={AudioService.audioElement}
        />
        <FlexBox justifyContent='space-between'>
          <VolumeMeter />
          <FlexBox flexDirection='column' justifyContent='space-between'>
            <FrequencyMeter />
            <Spectrogram />
          </FlexBox>
        </FlexBox>
      </>
    );
  }, [isLoadingAudioBuffer, didLoadAudioBuffer, audioLoaded]);

  if (!srcExists) {
    return (
      <DashboardContent>
        <FlexBox
          justifyContent='center'
          alignItems='center'
          width='100%'
          height='100%'
          flexDirection='column'
          paddingBottom='4rem'
        >
          <Heading2 fontWeight={400} color={COLORS.white}>
            Choose a file to start analyzer!
          </Heading2>
          <Box marginTop='12px'>
            <Heading3 fontWeight={300} fontSize='18px' color={COLORS.white}>
              Browse files in your projects{' '}
              <Anchor to={ROUTES.DASHBOARD_PROJECTS}>here</Anchor>.
            </Heading3>
          </Box>
        </FlexBox>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent
      title='My_superb_audio_file.wav'
      subTitles={['18:40', '24.09.2021', '30s']}
      canGoBack
    >
      {content}
    </DashboardContent>
  );
};

export default AnalyserView;
