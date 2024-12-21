import { ClubType } from '../model/Club';
import { getSupabaseClient } from './supabase';

export const getClubs = async () => {
  const { data } = await getSupabaseClient()
    .from('clubs')
    .select<string, ClubType>();

  return data || [];
};
