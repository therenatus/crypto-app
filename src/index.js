import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import { CurrencyProvider } from './CurrencyContext';
import 'react-alice-carousel/lib/alice-carousel.css';
import { createTheme, ThemeProvider } from '@mui/material';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff'
    }
  },
  type: 'dark'
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CurrencyProvider>
        <Router>
          <App />
        </Router>
      </CurrencyProvider>
    </ThemeProvider>
  </React.StrictMode>
);
