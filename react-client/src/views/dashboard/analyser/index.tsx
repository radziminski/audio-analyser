import React, { useMemo, useEffect, useState } from 'react';
import VolumeMeter from '~/components/VolumeMeter';
import Waveform from '~/components/Waveform';
import FrequencyMeter from '~/components/FrequencyMeter';
import { useStoreState, useStoreActions } from '~/global-state/hooks';
import DashboardContent from '~/components/DashboardContent';
import AudioService from '~/services/AudioService';
import { useParams } from 'react-router';
import Box, { FlexBox } from '~/components/Box';
import Spectrogram from '~/components/Spectrogram';
import { Heading2, Heading3 } from '~/components/Text';
import { COLORS } from '~/styles/theme';
import Anchor from '~/components/Anchor';
import { ROUTES } from '~/constants/routes';
import Loader from '~/components/Loader';
import SingleParametersBar from '~/components/SingleParametersBar';
import CoefficientsGraph from '~/components/CoefficientsGraph';

const getFileDateTime = (datetime: string) => {
  const date = new Date(datetime);

  return {
    date: date.toUTCString(),
    time: date.toISOString()
  };
};

const getFileSizeMb = (size: number) => {
  return Math.round((size * 100) / (1024 * 1024)) / 100;
};

export const AnalyserView: React.FC = () => {
  const [audioLoaded, setAudioLoaded] = useState(false);

  const {
    audio: {
      isLoadingAudioBuffer,
      didLoadAudioBuffer,
      currSource,
      audioSources
    },
    project: { projects },
    ui: {
      audioUIState: {
        waveform: {
          barWidth,
          barSpacing,
          height: waveformHeight,
          isOpened: isWaveformOpened
        },
        volume: { isOpened: isVolumeOpened },
        frequency: { isOpened: isFrequencyOpened },
        spectrogram: {
          isOpened: isSpectrogramOpened,
          height: spectrogramHeight
        },
        bands: { isChromaOpened, isMfccOpened },
        coefficients: { isOpened: isCoefficientOpened }
      }
    }
  } = useStoreState((state) => state);

  const { id: srcId } = useParams<{ id: string }>();
  const file = projects
    ?.map((project) => project.files)
    .flat()
    .find((file) => file?.id === +srcId);

  const { loadAudioBuffer, loadAudio, setCurrSource } = useStoreActions(
    (actions) => actions.audio
  );

  useEffect(() => {
    const setAudioLoadedFunction = () => setAudioLoaded(true);

    if (srcId && srcId !== currSource && audioSources[srcId]) {
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
  }, [srcId, audioSources, loadAudio, currSource, setCurrSource]);

  const srcExists = currSource || (srcId && audioSources[srcId]);

  useEffect(() => {
    if (!currSource) return;

    if (!didLoadAudioBuffer) loadAudioBuffer();
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
        {isWaveformOpened && (
          <Waveform
            audioBuffer={AudioService?.buffer}
            isLoadingAudioBuffer={isLoadingAudioBuffer ?? false}
            didLoadAudioBuffer={didLoadAudioBuffer ?? false}
            barMinHeight={1}
            barWidth={barWidth}
            barSpacing={barSpacing}
            height={waveformHeight}
            audioElement={AudioService.audioElement}
          />
        )}
        {(isChromaOpened || isMfccOpened) && (
          <Box margin='2rem 0 1rem'>
            <SingleParametersBar
              isChromaOpened={isChromaOpened}
              isMfccOpened={isMfccOpened}
            />
          </Box>
        )}
        <FlexBox justifyContent='space-between' marginTop='1rem'>
          {isVolumeOpened && <VolumeMeter />}
          <FlexBox
            flexDirection='column'
            justifyContent='space-between'
            flex={1}
            paddingLeft={isVolumeOpened ? '3rem' : 0}
          >
            {isFrequencyOpened && <FrequencyMeter />}
            {isSpectrogramOpened && (
              <Box marginTop={isFrequencyOpened ? '1rem' : 0}>
                <Spectrogram height={spectrogramHeight} />
              </Box>
            )}
          </FlexBox>
        </FlexBox>
        {isCoefficientOpened && (
          <Box marginTop='3rem'>
            <CoefficientsGraph />
          </Box>
        )}
      </>
    );
  }, [
    isLoadingAudioBuffer,
    didLoadAudioBuffer,
    audioLoaded,
    isVolumeOpened,
    isFrequencyOpened,
    isSpectrogramOpened,
    isChromaOpened,
    isMfccOpened,
    isWaveformOpened
  ]);

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
      title={file?.name ?? 'Audio File'}
      subTitles={
        file
          ? [
              getFileDateTime(file.createdAt ?? '').date,
              `${getFileSizeMb(file.size)}MB`
            ]
          : ['Unknown']
      }
      canGoBack
    >
      {content}
    </DashboardContent>
  );
};

export default AnalyserView;
