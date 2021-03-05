import React, { useMemo, useRef, useEffect, useState } from 'react';
import VolumeMeter from 'components/VolumeMeter';
import Waveform from 'components/Waveform';
import { useStoreState, useStoreActions } from 'global-state/hooks';
import { usePlayOnSpace } from 'hooks/usePlayOnSpace';
import DashboardContent from 'components/DashboardContent';

export const AnalyserView: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioLoaded, setAudioLoaded] = useState(false);

  const {
    controller,
    isLoadingAudioBuffer,
    didLoadAudioBuffer,
    isPlaying
  } = useStoreState((state) => state.audio);

  const { initController, loadAudioBuffer, play, pause } = useStoreActions(
    (actions) => actions.audio
  );

  usePlayOnSpace(
    () => play(),
    () => pause(),
    isPlaying
  );

  useEffect(() => {
    if (audioRef.current) {
      initController(audioRef.current);
      loadAudioBuffer();
      setAudioLoaded(true);
    }
  }, [audioRef]);

  const content = useMemo(() => {
    console.log(isLoadingAudioBuffer || !didLoadAudioBuffer);
    if (
      !audioRef.current ||
      isLoadingAudioBuffer ||
      !didLoadAudioBuffer ||
      !controller
    )
      return null;
    return (
      <>
        <Waveform
          audioBuffer={controller?.buffer}
          isLoadingAudioBuffer={isLoadingAudioBuffer ?? false}
          didLoadAudioBuffer={didLoadAudioBuffer ?? false}
          barMinHeight={1}
          barWidth={4}
          barSpacing={1}
          height={150}
          barBorderRadius={8}
          audioElement={audioRef.current}
        />
        <VolumeMeter audioController={controller} />
      </>
    );
  }, [
    audioRef,
    audioRef.current,
    audioLoaded,
    isLoadingAudioBuffer,
    didLoadAudioBuffer,
    controller
  ]);

  return (
    <>
      <DashboardContent
        title='My_superb_audio_file.wav'
        subTitles={['18:40', '24.09.2021', '30s']}
      >
        {content}
        <audio src={require('assets/sample.wav')} ref={audioRef} />
      </DashboardContent>
    </>
  );
};

export default AnalyserView;
