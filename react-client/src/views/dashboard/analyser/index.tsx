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
import ActionButton from '~/components/ActionButton';
import SingleParametersBar from '~/components/SingleParametersBar';

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

const WIDGETS = ['waveform', 'volume', 'freq', 'spectro', 'bar'];

const INIT_WIDGETS = {
  waveform: true,
  volume: true,
  freq: true,
  spectro: true,
  bar: true
};

export const AnalyserView: React.FC = () => {
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [shownWidgets, setShownWidgets] = useState(INIT_WIDGETS);

  const {
    audio: {
      isLoadingAudioBuffer,
      didLoadAudioBuffer,
      currSource,
      audioSources
    },
    project: { projects }
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
        <FlexBox marginBottom='2rem'>
          {WIDGETS.map((widget) => (
            <Box marginRight='2rem' key={widget}>
              <ActionButton
                onClick={() => {
                  setShownWidgets({
                    ...shownWidgets,
                    [widget]: !shownWidgets[widget]
                  });
                }}
                fontSize='0.75rem'
              >
                {widget}
              </ActionButton>
            </Box>
          ))}
        </FlexBox>
        {shownWidgets.waveform && (
          <Waveform
            audioBuffer={AudioService?.buffer}
            isLoadingAudioBuffer={isLoadingAudioBuffer ?? false}
            didLoadAudioBuffer={didLoadAudioBuffer ?? false}
            barMinHeight={1}
            barWidth={5}
            barSpacing={1}
            height={140}
            barBorderRadius={0}
            audioElement={AudioService.audioElement}
          />
        )}
        {shownWidgets.bar && (
          <Box margin='2rem 0 1rem'>
            <SingleParametersBar />
          </Box>
        )}
        <FlexBox justifyContent='space-between' marginTop='1rem'>
          {shownWidgets.volume && <VolumeMeter />}
          <FlexBox
            flexDirection='column'
            justifyContent='space-between'
            flex={1}
            paddingLeft={shownWidgets.volume ? '3rem' : 0}
          >
            {shownWidgets.freq && <FrequencyMeter />}
            {shownWidgets.spectro && (
              <Box marginTop='2rem'>
                <Spectrogram />
              </Box>
            )}
          </FlexBox>
        </FlexBox>
      </>
    );
  }, [isLoadingAudioBuffer, didLoadAudioBuffer, audioLoaded, shownWidgets]);

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
