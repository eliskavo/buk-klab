import { ClubType, ClubWithMemberCount, UpdateClubType } from '../model/Club';
import { getSupabaseClient } from './supabase';

export const getClubs = async () => {
  const { data } = await getSupabaseClient()
    .from('clubs')
    .select<string, ClubWithMemberCount>(
      `
      *,
      members:clubs_members(count)
    `,
    );

  return (data || []).map((club) => ({
    ...club,
    memberCount: club.members[0].count,
  }));
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
      .select<string, ClubType>();

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
      .select<string, ClubType>()
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
      .select<string, ClubType>()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating club:', error);
    throw error;
  }
};
