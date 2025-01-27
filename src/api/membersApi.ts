import { ClubType } from '../model/Club';
import { MemberType } from '../model/Member';
import { getSupabaseClient } from './supabase';

export const getMembers = async () => {
  const { data } = await getSupabaseClient()
    .from('members')
    .select<string, MemberType>('id, firstname, lastname, profile_image');

  return data || [];
};

export const getMemberDetail = async (id: string) => {
  try {
    const { data, error } = await getSupabaseClient()
      .from('members')
      .select<string, MemberType>('id, firstname, lastname, profile_image, bio')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error getting member detail:', error);
  }
};

export const updateMember = async (
  id: string,
  updatedData: Partial<MemberType>,
) => {
  try {
    const { data, error } = await getSupabaseClient()
      .from('members')
      .update(updatedData)
      .eq('id', id)
      .select<string, MemberType>()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating member:', error);
  }
};

export const getClubsByMember = async (id: string) => {
  try {
    const { data, error } = await getSupabaseClient()
      .from('clubs_members')
      .select('clubId')
      .eq('memberId', id);

    if (error) {
      return [];
    }

    const clubIds = data.map((club) => club.clubId);

    const { data: clubs, error: clubsError } = await getSupabaseClient()
      .from('clubs')
      .select<string, ClubType>('name, description, clubImage, id')
      .in('id', clubIds);

    if (clubsError) {
      throw clubsError;
    }

    return clubs;
  } catch (error) {
    console.error('Error getting clubs by member:', error);

    return [];
  }
};
