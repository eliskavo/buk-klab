import { parseBookId } from '../utils/parseId';
import { FetchBooksParams } from '../../types/types';

const page = 1;
const limit = 30;

export const BookAPI = {
  async fetchSearchBooks({ query }: FetchBooksParams) {
    const offset = (page - 1) * limit;
    const url = `https://openlibrary.org/search.json?q=${query}&fields=key,title,author_name,cover_i,editions&lang=eng,cze&limit=${limit}&offset=${offset}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      return {
        books: data.docs.map((book: any) => ({
          id: parseBookId(book.key),
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
  },

  async fetchTrendingBooks({}: FetchBooksParams) {
    try {
      const response = await fetch(
        'https://openlibrary.org/trending/daily.json?limit=150',
      );
      const data = await response.json();

      const allBooks = data.works.map((book: any) => ({
        id: parseBookId(book.key),
        title: book.title || 'Untitled',
        author: book.author_name?.[0] || 'Unknown',
        cover: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : '',
        isCurrentlyReading: false,
      }));

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      return {
        books: allBooks.slice(startIndex, endIndex),
        total: allBooks.length,
      };
    } catch (error) {
      console.error('Error fetching trending books:', error);

      return { books: [], total: 0 };
    }
  },
};
