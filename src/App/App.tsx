import React from 'react';

import StyleBaseline from '../design-tokens/StyleBaseline';

import AppContent from './AppContent';
import AppContextProvider from './AppContextProvider';

/* eslint-disable react/jsx-max-depth */
const App: React.FC = () => (
  <StyleBaseline>
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  </StyleBaseline>
);

export default App;
