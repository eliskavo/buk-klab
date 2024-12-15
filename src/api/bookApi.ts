import { parseItemIdFromUri } from '../utils/parseItemIdFromUri';
import { Book } from '../model/Book';
import { getFetch } from './base';

const LIMIT = 30;
const OFFSET = 0;

type FetchBooksParams = {
  query?: string;
  page?: number;
  limit?: number;
};

type DocType = {
  author_name: string[];
  cover_i?: number;
  key: string;
  title: string;
};

type SearchResponse = {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: DocType[];
  num_found: number;
  q: string;
  offset: number;
};

export const fetchSearchBooks = async ({ query }: FetchBooksParams) => {
  const searchParams = new URLSearchParams({
    q: query ?? '',
    fields: 'key,title,author_name,cover_i',
    lang: 'eng,cze',
    limit: String(LIMIT),
    offset: String(OFFSET),
  });

  const url = `https://openlibrary.org/search.json?${searchParams.toString()}`;

  try {
    const data = await getFetch<SearchResponse>(url);

    const allBooks: Book[] = data.docs.map((book: DocType) => ({
      id: parseItemIdFromUri(book.key),
      title: book.title || 'Untitled',
      author: book.author_name?.[0] || 'Unknown',
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : '',
      isCurrentlyReading: false,
    }));

    return {
      books: allBooks,
      total: data.num_found,
    };
  } catch (error) {
    console.error('Error fetching search books:', error);

    return { books: [], total: 0 };
  }
};

type WorkType = {
  author_key?: string[];
  author_name?: string[];
  cover_edition_key?: string;
  cover_i?: number;
  edition_count: number;
  first_publish_year?: number;
  has_fulltext: boolean;
  ia?: string[];
  ia_collection_s?: string;
  key: string;
  language?: string[];
  public_scan_b: boolean;
  title: string;
  lending_edition_s?: string;
  lending_identifier_s?: string;
  id_project_gutenberg?: string[];
  id_librivox?: string[];
  id_standard_ebooks?: string[];
  subtitle?: string;
};

type TrendingBooksResponse = {
  works: WorkType[];
};

export const fetchTrendingBooks = async () => {
  const searchParams = new URLSearchParams({
    lang: 'eng,cze',
    limit: String(LIMIT),
  });

  const url = `https://openlibrary.org/trending/daily.json?${searchParams.toString()}`;

  try {
    const data = await getFetch<TrendingBooksResponse>(url);

    const allBooks: Book[] = data.works.map((book: WorkType) => ({
      id: parseItemIdFromUri(book.key),
      title: book.title || 'Untitled',
      author: book.author_name?.[0] || 'Unknown',
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : '',
      isCurrentlyReading: false,
    }));

    return {
      books: allBooks.slice(OFFSET, OFFSET + LIMIT),
      total: allBooks.length,
    };
  } catch (error) {
    console.error('Error fetching trending books:', error);

    return { books: [], total: 0 };
  }
};
