import DashboardContent from 'components/DashboardContent';
import NavPanel from 'components/NavPanel';
import Waveform from 'components/Waveform';
import React from 'react';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <NavPanel />
      <DashboardContent
        title='My_superb_audio_file.wav'
        subTitles={['18:40', '24.09.2021', '30s']}
      >
        <Waveform url={require('../../assets/sample.wav')} />
        {children}
      </DashboardContent>
    </>
  );
};

export default Layout;
