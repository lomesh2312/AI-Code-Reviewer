import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { isConfigured } from './firebase';

const ConfigError = () => (
  <div style={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
    color: 'white',
    fontFamily: 'system-ui, sans-serif'
  }}>
    <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Configuration Required</h1>
    <p style={{ color: '#9CA3AF', marginBottom: '2rem' }}>Please set up your .env file with valid Firebase credentials.</p>
    <div style={{ padding: '1rem', backgroundColor: '#1F2937', borderRadius: '0.5rem', fontFamily: 'monospace' }}>
      VITE_FIREBASE_API_KEY=...
    </div>
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isConfigured ? <App /> : <ConfigError />}
  </StrictMode>
);
