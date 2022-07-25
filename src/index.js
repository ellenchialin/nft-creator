import { ColorModeScript, ChakraProvider } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { UserProvider } from './contexts/UserContext';
import App from './App';
import theme from './theme';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <UserProvider>
        <ColorModeScript />
        <App />
      </UserProvider>
    </ChakraProvider>
  </StrictMode>
);
