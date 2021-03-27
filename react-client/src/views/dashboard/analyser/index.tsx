import React, { useMemo, useRef, useEffect, useState } from 'react';
import VolumeMeter from 'components/VolumeMeter';
import Waveform from 'components/Waveform';
import FrequencyMeter from 'components/FrequencyMeter';
import { useStoreState, useStoreActions } from 'global-state/hooks';
import { usePlayOnSpace } from 'hooks/usePlayOnSpace';
import DashboardContent from 'components/DashboardContent';
import audioService from 'global-state/audio/audioController';
import { useHistory, useParams } from 'react-router';
import { ROUTES } from 'constants/routes';

export const AnalyserView: React.FC = () => {
  const [audioLoaded, setAudioLoaded] = useState(false);

  const {
    isLoadingAudioBuffer,
    didLoadAudioBuffer,
    isPlaying,
    currSrc,
    audioSources
  } = useStoreState((state) => state.audio);

  const { id: srcId } = useParams<{ id: string }>();
  const history = useHistory();

  const { loadAudioBuffer, play, pause, stop, loadAudio } = useStoreActions(
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
  }, [srcId]);

  useEffect(() => {
    if (!currSrc) return;

    loadAudioBuffer();
    setAudioLoaded(true);
  }, [currSrc]);

  const content = useMemo(() => {
    if (
      !audioService.audioElement ||
      isLoadingAudioBuffer ||
      !didLoadAudioBuffer ||
      !audioService
    )
      return null;
    console.log('Rendering...');

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
        <VolumeMeter />
        <FrequencyMeter />
      </>
    );
  }, [
    audioService.audioElement,
    audioLoaded,
    isLoadingAudioBuffer,
    didLoadAudioBuffer,
    audioService
  ]);

  return (
    <>
      <DashboardContent
        title='My_superb_audio_file.wav'
        subTitles={['18:40', '24.09.2021', '30s']}
      >
        {content}
      </DashboardContent>
    </>
  );
};

export default AnalyserView;
