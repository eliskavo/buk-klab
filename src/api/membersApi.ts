import { MemberType } from '../model/Member';
import { getSupabaseClient } from './supabase';

export const getMembers = async () => {
  const { data } = await getSupabaseClient().from('members').select('*');

  return data as MemberType[];
};
