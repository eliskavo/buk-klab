import { ClubCurrentBookType } from '../model/Book';
import { getSupabaseClient } from './supabase';

export const getClubsCurrentBook = async (clubId: number) => {
  try {
    const { data, error } = await getSupabaseClient()
      .from('clubs_currentBook')
      .select<string, ClubCurrentBookType>()
      .eq('clubId', clubId);

    if (error) {
      throw error;
    }

    return data[0];
  } catch (error) {
    console.error('Error getting current book:', error);
    throw error;
  }
};

export const setClubsCurrentBook = async (clubId: number, bookId: string) => {
  try {
    const { data, error } = await getSupabaseClient()
      .from('clubs_currentBook')
      .insert({ clubId, currentBookId: bookId })
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error setting current book:', error);

    throw error;
  }
};
