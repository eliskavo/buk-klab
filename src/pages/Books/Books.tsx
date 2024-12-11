import { useState, useEffect } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import clsx from 'clsx';

import { Layout } from '../../components/Layout/Layout';
import { BookCard } from '../../components/BookCard/BookCard';
import { CurrentBookCard } from '../../components/CurrentBookCard/CurrentBookCard';
import { Book } from '../../../types/types';
import { fetchSearchBooks, fetchTrendingBooks } from '../../api/bookAPI';
import { Pagination } from '../../components/Pagination/Pagination';
import { Loading } from '../../components/Loading/Loading';
import style from './Books.module.scss';

const BOOKS_PER_PAGE = 30;

export const Books: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);

  const fetchBooks = async (page: number = 1) => {
    setIsLoading(true);
    try {
      const result = searchQuery
        ? await fetchSearchBooks({
            query: searchQuery,
            page,
            limit: BOOKS_PER_PAGE,
          })
        : await fetchTrendingBooks();

      setBooks(result.books);
      setTotalBooks(result.total);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchBooks();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const currentlyReadingBook = books.find((book) => book.isCurrentlyReading);

  return (
    <Layout>
      <div className={style.bookSection}>
        {currentlyReadingBook && (
          <div>
            <h2 className={style.currentReadingTitle}>
              We are currently reading:
            </h2>
            <CurrentBookCard books={[currentlyReadingBook]} />
          </div>
        )}

        <div className={style.searchSection}>
          <div className={style.searchHeader}>
            <h2>Discover our books</h2>
            {!isSearchOpen && (
              <button
                className={style.searchIcon}
                onClick={() => setIsSearchOpen(true)}
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
              aria-label="search books"
            />
          </div>

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
                totalItems={totalBooks}
                itemsPerPage={BOOKS_PER_PAGE}
                onPageChange={(page) => fetchBooks(page)}
                showTotalPages
              />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};
