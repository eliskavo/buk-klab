import { ClubType, UpdateClubType } from '../model/Club';
import { getSupabaseClient } from './supabase';

export const getClubs = async () => {
  const { data } = await getSupabaseClient()
    .from('clubs')
    .select<string, ClubType>();

  return data || [];
};

export const createClub = async (
  clubData: Pick<ClubType, 'name' | 'description'>,
  ownerId: string,
) => {
  try {
    const { data, error } = await getSupabaseClient()
      .from('clubs')
      .insert({
        ...clubData,
        ownerId,
      })
      .select();

    if (error) {
      throw error;
    }

    await getSupabaseClient().from('clubs_members').insert({
      memberId: ownerId,
      clubId: data[0].id,
    });

    return data[0];
  } catch (error) {
    console.error('Error creating club:', error);
    throw error;
  }
};

export const getClubDetail = async (id: number) => {
  try {
    const { data, error } = await getSupabaseClient()
      .from('clubs')
      .select()
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error getting club detail:', error);
    throw error;
  }
};

export const deleteClub = async (id: number) => {
  try {
    const { error } = await getSupabaseClient()
      .from('clubs')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting club:', error);
  }
};

export const updateClub = async (id: number, updatedData: UpdateClubType) => {
  try {
    const { data, error } = await getSupabaseClient()
      .from('clubs')
      .update(updatedData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating club:', error);
  }
};

export const isUserClubMember = async (userId: string, clubId: number) => {
  try {
    const { data, error } = await getSupabaseClient()
      .from('clubs_members')
      .select()
      .eq('memberId', userId)
      .eq('clubId', clubId);

    if (error) {
      throw error;
    }

    return data.length > 0;
  } catch (error) {
    console.error('Error checking club membership:', error);
    throw error;
  }
};

export const joinClub = async (userId: string, clubId: number) => {
  try {
    const isMember = await isUserClubMember(userId, clubId);

    if (isMember) {
      throw new Error('User is already a member of this club');
    }

    const { error } = await getSupabaseClient()
      .from('clubs_members')
      .insert({
        memberId: userId,
        clubId,
      })
      .select();

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error joining club:', error);
    throw error;
  }
};

export const getClubMembers = async (clubId: number) => {
  try {
    const { data, count, error } = await getSupabaseClient()
      .from('clubs_members')
      .select('*', { count: 'exact' })
      .eq('clubId', clubId);

    if (error) {
      throw error;
    }

    return { members: data, count };
  } catch (error) {
    console.error('Error getting member count:', error);
    throw error;
  }
};

export const leaveClub = async (userId: string, clubId: number) => {
  try {
    const { error } = await getSupabaseClient()
      .from('clubs_members')
      .delete()
      .eq('memberId', userId)
      .eq('clubId', clubId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error leaving club:', error);
    throw error;
  }
};
