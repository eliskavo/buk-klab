import { useState, useEffect, useMemo } from 'react';

import { BookCard } from '../../components/BookCard/BookCard';
import { Book } from '../../model/Book';
import { fetchSearchBooks, fetchTrendingBooks } from '../../api/bookApi';
import { Pagination } from '../../components/Pagination/Pagination';
import { Loading } from '../../components/Loading/Loading';
import { BookLayout } from '../../components/books/BookLayout';
import style from './Books.module.scss';

const BOOKS_PER_PAGE = 30;
const SEARCH_DELAY = 500;

export const Books: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchBooks = async (
    fetchFunction: () => Promise<Book[]>,
    page: number = 1,
  ) => {
    setIsLoading(true);
    try {
      const resultBooks = await fetchFunction();

      setBooks(resultBooks);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(fetchTrendingBooks);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      return;
    }

    fetchBooks(() => fetchTrendingBooks(currentPage));
  }, [searchQuery, currentPage]);

  useEffect(() => {
    if (searchQuery == null) {
      return;
    }

    if (searchQuery === '') {
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
      setSearchQuery={setSearchQuery}
    >
      {isLoading ? (
        <Loading message="loading books" />
      ) : (
        <>
          <div className={style.bookGrid}>
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={BOOKS_PER_PAGE}
            onPageChange={(page) => fetchBooks(() => fetchTrendingBooks(page))}
            showTotalPages
          />
        </>
      )}
    </BookLayout>
  );
};
