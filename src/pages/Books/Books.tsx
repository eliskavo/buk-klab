import { useState, useEffect } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import clsx from 'clsx';

import { Layout } from '../../components/Layout/Layout';
import { BookCard } from '../../components/BookCard/BookCard';
import { CurrentBookCard } from '../../components/CurrentBookCard/CurrentBookCard';
import { Book } from '../../../types/types';
import { parseBookId } from '../../utils/parseBookId';
import style from './Books.module.scss';

export const Books: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async (query: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}&fields=key,title,author_name,cover_i,editions,editions.key,editions.title,editions.cover_i`,
      );
      const data = await response.json();
      console.log('Fetched books:', data); // Log the API response

      const booksData = data.docs.map((book: any) => {
        // Prefer the first edition if available, otherwise fall back to work info
        const edition = book.editions?.docs?.[0] || book;

        return {
          id: parseBookId(edition.key),
          title: edition.title || book.title,
          author: book.author_name ? book.author_name[0] : 'Unknown',
          cover: edition.cover_i
            ? `https://covers.openlibrary.org/b/id/${edition.cover_i}-M.jpg`
            : '',
        };
      });

      console.log('Processed books:', booksData); // Log the processed book data
      setBooks(booksData);
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrendingBooks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        'https://openlibrary.org/trending/weekly.json?fields=key,title,author_name,cover_i,editions,editions.key,editions.title,editions.cover_i',
      );
      const data = await response.json();
      console.log('Fetched trending books:', data); // Log the API response

      const booksData = data.works.slice(0, 30).map((book: any) => {
        // Prefer the first edition if available, otherwise fall back to work info
        const edition = book.editions?.docs?.[0] || book;

        return {
          id: parseBookId(edition.key || book.key),
          title: edition.title || book.title,
          author: book.author_name ? book.author_name : 'Unknown',
          cover: edition.cover_i
            ? `https://covers.openlibrary.org/b/id/${edition.cover_i}-M.jpg`
            : '',
        };
      });

      console.log('Processed trending books:', booksData); // Log the processed book data
      setTrendingBooks(booksData);
    } catch (err) {
      console.error('Error fetching trending books:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingBooks();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      fetchBooks(searchQuery);
    } else {
      setBooks([]);
    }
  }, [searchQuery]);

  const currentlyReadingBook = books.find((book) => book.isCurrentlyReading);

  return (
    <Layout>
      <div className={style.bookSection}>
        <h2 className={style.currentReadingTitle}>We are currently reading:</h2>
        {currentlyReadingBook && (
          <CurrentBookCard book={currentlyReadingBook} />
        )}
        <div className={style.searchSection}>
          <div className={style.searchHeader}>
            <h2>Discover our books</h2>
            {!isSearchOpen && (
              <button
                className={style.searchIcon}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <SearchRoundedIcon sx={{ fontSize: 28 }} />
              </button>
            )}
            <input
              type="text"
              placeholder="search books..."
              className={clsx(style.searchInput, {
                [style.searchInputOpen]: isSearchOpen,
              })}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          {isLoading ? (
            <div className={style.loading}>loading books...</div>
          ) : (
            <div className={style.bookGrid}>
              {searchQuery
                ? books.map((book) => <BookCard key={book.id} book={book} />)
                : trendingBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
