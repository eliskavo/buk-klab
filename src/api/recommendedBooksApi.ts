import { BookType } from '../model/Book';
import { DocType, SearchResponse } from '../model/Doc';
import { parseItemIdFromUri } from '../utils/parseItemIdFromUri';
import { getFetch } from './base';
import placeholder_book from '../assets/images/placeholder_book.png';

export const fetchRecommendedBooks = async ({
  editionId,
  authorName,
}: {
  editionId: string;
  authorName: string;
}) => {
  try {
    const searchParams = new URLSearchParams({
      author: authorName,
      fields: 'key,title,author_name,cover_i,editions',
      limit: '6',
    });

    const data = await getFetch<SearchResponse>(
      `https://openlibrary.org/search.json?${searchParams}`,
    );

    const recommendedBooks: BookType[] = data.docs
      .filter((book) => book.editions.docs[0].key !== editionId)
      .map((book: DocType) => ({
        id: parseItemIdFromUri(book.editions.docs[0].key),
        title: book.editions.docs[0].title || 'Untitled',
        author: book.author_name?.[0] || 'Unknown',
        cover: book.editions.docs[0].cover_i
          ? `https://covers.openlibrary.org/b/id/${book.editions.docs[0].cover_i}-M.jpg`
          : placeholder_book,
        isCurrentlyReading: false,
      }));

    return recommendedBooks;
  } catch (error) {
    console.error('Error fetching recommended books:', error);

    return [];
  }
};
