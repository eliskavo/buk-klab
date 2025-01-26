import { ClubCurrentBookType } from '../model/Book';
import { getSupabaseClient } from './supabase';

export const getClubsCurrentBook = async (clubId: number) => {
  try {
    const { data, error } = await getSupabaseClient()
      .from('clubs_currentbook')
      .select<string, ClubCurrentBookType>()
      .eq('clubId', clubId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error getting current book:', error);
  }
};

export const setClubsCurrentBook = async (
  clubId: number,
  bookId: string,
  authorKey?: string | null,
) => {
  try {
    const { data, error } = await getSupabaseClient()
      .from('clubs_currentbook')
      .insert({ clubId, currentBookId: bookId, authorKey })
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error setting current book:', error);
  }
};

export const removeClubsCurrentBook = async (
  clubId: number,
  bookId: string,
) => {
  try {
    const { error } = await getSupabaseClient()
      .from('clubs_currentbook')
      .delete()
      .match({ clubId, currentBookId: bookId });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error removing current book:', error);
  }
};
