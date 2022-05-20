import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import { CurrencyProvider } from './CurrencyProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CurrencyProvider>
      <Router>
        <App />
      </Router>
    </CurrencyProvider>
  </React.StrictMode>
);
