import Waveform from 'components/Waveform';
import React from 'react';
import Layout from '../layout';

export const AnalyserView: React.FC = () => {
  return (
    <Layout
      title='My_superb_audio_file.wav'
      subTitles={['18:40', '24.09.2021', '30s']}
    >
      <Waveform url={require('assets/sample3.wav')} />
    </Layout>
  );
};

export default AnalyserView;
