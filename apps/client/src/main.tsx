import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './services/axiosSetup';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './styles.scss';

import App from './app/app';
import { ThemeProvider } from './theme-switcher/theme-switcher';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
