import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AuthProvider } from './context/AuthContext';
import './styles/global.scss';
import { App } from './App';
import { initializeSupabase } from './api/supabase';

initializeSupabase();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
