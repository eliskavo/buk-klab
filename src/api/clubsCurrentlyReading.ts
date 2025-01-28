import { ClubCurrentBookType } from '../model/Book';
import { getClubsByMember } from './membersApi';
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

export const getMemberCurrentlyReadingBooks = async (userId: string) => {
  try {
    const userClubs = await getClubsByMember(userId);

    const clubIds = userClubs.map((club) => club.id);
    const { data: currentBooks } = await getSupabaseClient()
      .from('clubs_currentbook')
      .select()
      .in('clubId', clubIds);

    return currentBooks || [];
  } catch (error) {
    console.error('Error getting member currently reading books:', error);

    return [];
  }
};
