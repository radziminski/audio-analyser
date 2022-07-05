import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import ModalsContainer from '~/components/Modal';
import { useStoreActions } from '~/global-state/hooks';
import audioService from '~/services/AudioService';
import AuthService from '~/services/AuthService';
import { GlobalStyles } from '~/styles/global';
import { defaultTheme } from '~/styles/theme';
import AppRoutes from '~/views';

import { MIN_SCREEN_WIDTH } from './constants/constants';
import { useOnResize } from './hooks/useOnResize';
import DeviceNotSupportedView from './views/device-not-supported';

const App: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioServiceReady, setAudioServiceReady] = useState(false);
  const [hasProperWindowSize, setHasProperWindowSize] = useState(
    window.innerWidth > MIN_SCREEN_WIDTH
  );

  useOnResize(
    () => setHasProperWindowSize(window.innerWidth > MIN_SCREEN_WIDTH),
    100
  );

  const setIsAuthenticated = useStoreActions(
    (state) => state.auth.setIsAuthenticated
  );

  useEffect(() => {
    if (audioRef.current) {
      audioService.init(audioRef.current);
      setAudioServiceReady(true);
    }
  }, [audioRef]);

  useEffect(() => {
    if (AuthService.hasStoredTokens()) setIsAuthenticated(true);
  }, [setIsAuthenticated]);

  return (
    <div className='App'>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        {hasProperWindowSize ? (
          <Router>{audioServiceReady && <AppRoutes />}</Router>
        ) : (
          <DeviceNotSupportedView />
        )}
        <ModalsContainer />
      </ThemeProvider>

      <audio ref={audioRef} crossOrigin='anonymous' />
    </div>
  );
};

export default App;
