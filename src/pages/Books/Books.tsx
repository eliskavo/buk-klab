import { useState, useEffect, useMemo } from 'react';

import { BookCard } from '../../components/BookCard/BookCard';
import { BookType } from '../../model/Book';
import { fetchSearchBooks } from '../../api/bookApi';
import { Loading } from '../../components/Loading/Loading';
import { BookLayout } from '../../components/books/BookLayout';
import { SearchBooksResult } from '../../model/Doc';
import search from '../../assets/images/search.png';
import style from './Books.module.scss';

const SEARCH_DELAY = 500;

export const Books: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [books, setBooks] = useState<BookType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState('');

  const fetchBooks = async (
    fetchFunction: () => Promise<SearchBooksResult>,
    page: number = 1,
  ) => {
    setIsLoading(true);
    try {
      const result = await fetchFunction();
      setBooks(result.books);
      setMessage(result.message || '');
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchUpdate = (query: string) => {
    setSearchQuery(query);

    if (query === '') {
      setMessage('Backspace champion! What shall we search for now?');
      setBooks([]);
    }
  };

  useEffect(() => {
    if (searchQuery == null) {
      return;
    }

    const timeoutId = setTimeout(() => {
      fetchBooks(() =>
        fetchSearchBooks({ query: searchQuery, page: currentPage }),
      );
    }, SEARCH_DELAY);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, currentPage]);

  const currentlyReadingBook = useMemo(
    () => books.find((book) => book.isCurrentlyReading),
    [books],
  );

  return (
    <BookLayout
      currentlyReadingBook={currentlyReadingBook}
      searchQuery={searchQuery}
      handleSearchUpdate={handleSearchUpdate}
    >
      {searchQuery == null && (
        <div className={style.welcome}>
          <img src={search} className={style.welcomeImage} />
        </div>
      )}
      {isLoading && <Loading message="loading books" />}
      {!isLoading && message && <div className={style.message}>{message}</div>}
      {!isLoading && !message && (
        <div className={style.bookGrid}>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </BookLayout>
  );
};
