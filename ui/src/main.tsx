import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './index.css';

const root = createRoot(document.getElementById('app') || document.documentElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);