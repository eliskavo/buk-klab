import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient<any, 'public', any> | null = null;

export const getSupabaseClient = () => {
  if (!supabase) {
    throw new Error('Supabase client is not initialized');
  }

  return supabase;
};

export const initializeSupabase = () => {
  supabase = createClient(
    import.meta.env.VITE_SUPABASE_PROJECT_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
  );
};
