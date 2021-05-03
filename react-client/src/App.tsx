import audioService from 'global-state/audio/audioController';
import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthService from 'services/AuthService';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles/global';
import { defaultTheme } from 'styles/theme';
import AppRoutes from 'views';

const App: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioServiceReady, setAudioServiceReady] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioService.init(audioRef.current);
      setAudioServiceReady(true);
    }
    AuthService.login({
      email: 'janek1@test.com',
      password: 'Abcdefg1'
    }).then((data) => console.log(data));
  }, [audioRef]);

  return (
    <div className='App'>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Router>{audioServiceReady && <AppRoutes />}</Router>
      </ThemeProvider>
      <audio ref={audioRef} />
    </div>
  );
};

export default App;
