import React, { useMemo, useRef, useEffect, useState } from 'react';
import VolumeMeter from 'components/VolumeMeter';
import Waveform from 'components/OldWaveform';
import Layout from '../layout';
import TestWaveform from 'components/Waveform';
import { useStoreState, useStoreActions } from 'global-state/hooks';
import { usePlayOnSpace } from 'hooks/usePlayOnSpace';

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
    if (!audioRef.current || isLoadingAudioBuffer || !didLoadAudioBuffer)
      return null;
    return (
      <>
        <TestWaveform
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
        <VolumeMeter audioElement={audioRef.current} />
      </>
    );
  }, [
    audioRef,
    audioRef.current,
    audioLoaded,
    isLoadingAudioBuffer,
    didLoadAudioBuffer
  ]);

  return (
    <>
      <Layout
        title='My_superb_audio_file.wav'
        subTitles={['18:40', '24.09.2021', '30s']}
      >
        {content}
      </Layout>
      <audio src={require('assets/sampleLong.mp3')} ref={audioRef} />
    </>
  );
};

export default AnalyserView;
