import { useState, useEffect } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import clsx from 'clsx';

import { Layout } from '../../components/Layout/Layout';
import { BookCard } from '../../components/BookCard/BookCard';
import { CurrentBookCard } from '../../components/CurrentBookCard/CurrentBookCard';
import { Book } from '../../../types/types';
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
        `https://openlibrary.org/search.json?q=${query}&fields=title,author_name,cover_i`,
      );
      const data = await response.json();
      const booksData = data.docs.map((book: any) => ({
        id: book.key,
        title: book.title,
        author: book.author_name ? book.author_name[0] : 'Unknown',
        cover: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : '',
      }));
      setBooks(booksData);
    } catch (err) {
      console.error('Error fetching trending books:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrendingBooks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        'https://openlibrary.org/trending/now.json?fields=title,author_name,cover_i',
      );
      const data = await response.json();
      const booksData = data.works.map((book: any) => ({
        id: book.key,
        title: book.title,
        author: book.author_name ? book.author_name[0] : 'Unknown',
        cover: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : '',
      }));
      setTrendingBooks(booksData);
      console.log('Trending books:', booksData);
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
