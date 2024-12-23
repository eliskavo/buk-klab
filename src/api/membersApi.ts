import { MemberType } from '../model/Member';
import { getSupabaseClient } from './supabase';

export const getMembers = async () => {
  const { data } = await getSupabaseClient()
    .from('members')
    .select<string, MemberType>();

  return data || [];
};
