import React, { useMemo, useEffect, useState } from 'react';
import VolumeMeter from 'components/VolumeMeter';
import Waveform from 'components/Waveform';
import FrequencyMeter from 'components/FrequencyMeter';
import { useStoreState, useStoreActions } from 'global-state/hooks';
import { usePlayOnSpace } from 'hooks/usePlayOnSpace';
import DashboardContent from 'components/DashboardContent';
import audioService from 'global-state/audio/audioController';
import { useParams } from 'react-router';
import { FlexBox } from 'components/Box';
import Spectrogram from 'components/Spectrogram';

export const AnalyserView: React.FC = () => {
  const [audioLoaded, setAudioLoaded] = useState(false);
  console.log(audioLoaded);

  const {
    isLoadingAudioBuffer,
    didLoadAudioBuffer,
    isPlaying,
    currSrc,
    audioSources
  } = useStoreState((state) => state.audio);

  const { id: srcId } = useParams<{ id: string }>();

  const { loadAudioBuffer, play, pause, loadAudio } = useStoreActions(
    (actions) => actions.audio
  );

  usePlayOnSpace(
    () => play(),
    () => pause(),
    isPlaying
  );

  useEffect(() => {
    console.log(srcId);
    if (srcId && audioSources[srcId]) {
      const src = audioSources[srcId];
      loadAudio(src);
    }
  }, [srcId, audioSources, loadAudio]);

  useEffect(() => {
    if (!currSrc) return;

    loadAudioBuffer();
    setAudioLoaded(true);
  }, [currSrc, loadAudioBuffer]);

  const content = useMemo(() => {
    if (
      !audioService.audioElement ||
      isLoadingAudioBuffer ||
      !didLoadAudioBuffer ||
      !audioService
    )
      return null;

    return (
      <>
        <Waveform
          audioBuffer={audioService?.buffer}
          isLoadingAudioBuffer={isLoadingAudioBuffer ?? false}
          didLoadAudioBuffer={didLoadAudioBuffer ?? false}
          barMinHeight={1}
          barWidth={4}
          barSpacing={1}
          height={150}
          barBorderRadius={8}
          audioElement={audioService.audioElement}
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
  }, [isLoadingAudioBuffer, didLoadAudioBuffer]);

  return (
    <DashboardContent
      title='My_superb_audio_file.wav'
      subTitles={['18:40', '24.09.2021', '30s']}
    >
      {content}
    </DashboardContent>
  );
};

export default AnalyserView;
