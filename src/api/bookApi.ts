import { parseItemIdFromUri } from '../utils/parseItemIdFromUri';
import { BookType } from '../model/Book';
import { getFetch } from './base';
import { SearchResponse, DocType } from '../model/Doc';

const LIMIT = 30;

export const fetchSearchBooks = async ({
  query,
  page = 1,
}: {
  query?: string;
  page?: number;
}) => {
  const searchParams = new URLSearchParams({
    q: query ?? '',
    fields: 'key,title,author_name,cover_i,editions,author_key',
    lang: 'eng,cze',
    limit: String(LIMIT),
    offset: String((page - 1) * LIMIT),
  });

  const url = `https://openlibrary.org/search.json?${String(searchParams)}`;

  try {
    const data = await getFetch<SearchResponse>(url);

    const allBooks: BookType[] = data.docs.map(
      ({ editions: { docs }, author_name, author_key }: DocType) => ({
        id: parseItemIdFromUri(docs[0].key),
        title: docs[0].title || 'Untitled',
        author: author_name?.[0] || 'Unknown',
        authorKey: author_key?.[0] || '',
        cover: docs[0].cover_i
          ? `https://covers.openlibrary.org/b/id/${docs[0].cover_i}-M.jpg`
          : '',
        isCurrentlyReading: false,
      }),
    );

    return allBooks;
  } catch (error) {
    console.error('Error fetching search books:', error);

    return [];
  }
};
