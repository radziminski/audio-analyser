import React, { useMemo, useRef, useEffect, useState } from 'react';
import VolumeMeter from 'components/VolumeMeter';
import Waveform from 'components/Waveform';
import Layout from '../layout';

export const AnalyserView: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioLoaded, setAudioLoaded] = useState(false);

  useEffect(() => {
    console.log(audioRef.current);
    if (audioRef.current) setAudioLoaded(true);
  }, [audioRef]);

  const content = useMemo(() => {
    console.log(audioRef.current);
    if (!audioRef.current) return null;
    return (
      <>
        <Waveform
          url={require('assets/sample3.wav')}
          audioElement={audioRef.current}
        />
        <VolumeMeter audioElement={audioRef.current} />
      </>
    );
  }, [audioRef, audioRef.current, audioLoaded]);

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
