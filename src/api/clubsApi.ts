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
    const { error } = await getSupabaseClient()
      .from('clubs')
      .update(updatedData)
      .eq('id', id);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error updating club:', error);
  }
};
