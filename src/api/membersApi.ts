import { getSupabaseClient } from './supabase';

export const getMembers = async () => {
  const { data } = await getSupabaseClient().from('members').select();

  return data;
};
