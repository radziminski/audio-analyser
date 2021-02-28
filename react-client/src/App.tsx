import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles/global';
import { defaultTheme } from 'styles/theme';
import Layout from 'views/dashboard/layout';
import HomeView from 'views/home';

const App: React.FC = () => {
  return (
    <div className='App'>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Layout />
      </ThemeProvider>
    </div>
  );
};

export default App;
