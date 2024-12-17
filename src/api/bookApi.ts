import { parseItemIdFromUri } from '../utils/parseItemIdFromUri';
import { BookType } from '../model/Book';
import { getFetch } from './base';
import { WorkType } from '../model/Work';
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
    fields: 'key,title,author_name,cover_i',
    lang: 'eng,cze',
    limit: String(LIMIT),
    offset: String((page - 1) * LIMIT),
  });

  const url = `https://openlibrary.org/search.json?${String(searchParams)}`;

  try {
    const data = await getFetch<SearchResponse>(url);

    const allBooks: BookType[] = data.docs.map((book: DocType) => ({
      id: parseItemIdFromUri(book.key),
      title: book.title || 'Untitled',
      author: book.author_name?.[0] || 'Unknown',
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : '',
      isCurrentlyReading: false,
    }));

    return allBooks;
  } catch (error) {
    console.error('Error fetching search books:', error);

    return [];
  }
};

type TrendingBooksResponse = {
  works: WorkType[];
};

export const fetchTrendingBooks = async (page: number = 1) => {
  const searchParams = new URLSearchParams({
    lang: 'eng,cze',
    limit: String(LIMIT),
    page: String(page),
  });

  const url = `https://openlibrary.org/trending/daily.json?${String(searchParams)}`;

  try {
    const data = await getFetch<TrendingBooksResponse>(url);

    const allBooks: BookType[] = data.works.map((book: WorkType) => ({
      id: parseItemIdFromUri(book.key),
      title: book.title || 'Untitled',
      author: book.author_name?.[0] || 'Unknown',
      authorKey: book.author_key?.[0] || '',
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : '',
      isCurrentlyReading: false,
    }));

    return allBooks;
  } catch (error) {
    console.error('Error fetching trending books:', error);

    return [];
  }
};
