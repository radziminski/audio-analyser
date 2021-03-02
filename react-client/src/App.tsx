import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles/global';
import { defaultTheme } from 'styles/theme';
import AnalyserView from 'views/dashboard/analyser';
import Layout from 'views/dashboard/layout';
import HomeView from 'views/home';

const App: React.FC = () => {
  return (
    <div className='App'>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <AnalyserView />
      </ThemeProvider>
    </div>
  );
};

export default App;
