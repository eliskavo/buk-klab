import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/global.scss';
import { App } from './App';
import { initializeSupabase } from './api/supabase';

initializeSupabase();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
