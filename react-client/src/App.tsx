import audioService from 'services/AudioControllerService';
import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthService from 'services/AuthService';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles/global';
import { defaultTheme } from 'styles/theme';
import AppRoutes from 'views';
import { useStoreActions } from 'global-state/hooks';

const App: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioServiceReady, setAudioServiceReady] = useState(false);

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
        <Router>{audioServiceReady && <AppRoutes />}</Router>
      </ThemeProvider>
      <audio ref={audioRef} crossOrigin='anonymous' />
    </div>
  );
};

export default App;
