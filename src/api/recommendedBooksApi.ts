import { BookType } from '../model/Book';
import { DocType, SearchResponse } from '../model/Doc';
import { parseItemIdFromUri } from '../utils/parseItemIdFromUri';
import { getFetch } from './base';

export const fetchRecommendedBooks = async ({
  queryId,
  authorName,
}: {
  queryId: string;
  authorName: string;
}) => {
  try {
    const searchParams = new URLSearchParams({
      author: authorName,
      fields: 'key,title,author_name,cover_i,editions',
      limit: '5',
      lang: 'eng,cze',
    });

    const url = `https://openlibrary.org/search.json?${String(searchParams)}`;
    const data = await getFetch<SearchResponse>(url);

    const recommendedBooks: BookType[] = data.docs
      .filter((book) => book.editions.docs[0].key !== queryId)
      .map((book: DocType) => ({
        id: parseItemIdFromUri(book.editions.docs[0].key),
        title: book.editions.docs[0].title || 'Untitled',
        author: book.author_name?.[0] || 'Unknown',
        cover: book.editions.docs[0].cover_i
          ? `https://covers.openlibrary.org/b/id/${book.editions.docs[0].cover_i}-M.jpg`
          : '',
        isCurrentlyReading: false,
      }));

    return recommendedBooks;
  } catch (error) {
    console.error('Error fetching recommended books:', error);

    return [];
  }
};
