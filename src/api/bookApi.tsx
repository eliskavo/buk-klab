import { parseItemIdFromUri } from '../utils/parseItemIdFromUri';

const PAGE = 1;
const LIMIT = 30;

type FetchBooksParams = {
  query?: string;
  page?: number;
  limit?: number;
};

export const fetchSearchBooks = async ({ query }: FetchBooksParams) => {
  const offset = (PAGE - 1) * LIMIT;
  const url = `https://openlibrary.org/search.json?q=${query}&fields=key,title,author_name,cover_i,editions&lang=eng,cze&LIMIT=${LIMIT}&offset=${offset}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      books: data.docs.map((book: any) => ({
        id: parseItemIdFromUri(book.key),
        title: book.title || 'Untitled',
        author: book.author_name?.[0] || 'Unknown',
        cover: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : '',
        isCurrentlyReading: false,
      })),
      total: data.num_found,
    };
  } catch (error) {
    console.error('Error fetching search books:', error);

    return { books: [], total: 0 };
  }
};

export const fetchTrendingBooks = async () => {
  try {
    const response = await fetch(
      'https://openlibrary.org/trending/daily.json?',
    );
    const data = await response.json();

    const allBooks = data.works.map((book: any) => ({
      id: parseItemIdFromUri(book.key),
      title: book.title || 'Untitled',
      author: book.author_name?.[0] || 'Unknown',
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : '',
      isCurrentlyReading: false,
    }));

    const startIndex = (PAGE - 1) * LIMIT;
    const endIndex = startIndex + LIMIT;

    return {
      books: allBooks.slice(startIndex, endIndex),
      total: allBooks.length,
    };
  } catch (error) {
    console.error('Error fetching trending books:', error);

    return { books: [], total: 0 };
  }
};
