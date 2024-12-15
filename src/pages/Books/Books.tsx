import { useState, useEffect, useMemo } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import clsx from 'clsx';

import { Layout } from '../../components/Layout/Layout';
import { BookCard } from '../../components/BookCard/BookCard';
import { CurrentBookCard } from '../../components/CurrentBookCard/CurrentBookCard';
import { Book } from '../../model/Book';
import { fetchSearchBooks, fetchTrendingBooks } from '../../api/bookApi';
import { Pagination } from '../../components/Pagination/Pagination';
import { Loading } from '../../components/Loading/Loading';
import style from './Books.module.scss';

const BOOKS_PER_PAGE = 30;
const SEARCH_DELAY = 500;

const iconSx = { fontSize: 28 };

export const Books: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
                aria-label="Open search"
              >
                <SearchRoundedIcon sx={iconSx} />
              </button>
            )}
            <input
              type="text"
              placeholder="search books..."
              className={clsx(style.searchInput, {
                [style.searchInputOpen]: isSearchOpen,
              })}
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search books"
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
                totalItems={totalItems}
                itemsPerPage={BOOKS_PER_PAGE}
                onPageChange={(page) =>
                  fetchBooks(() => fetchTrendingBooks(page))
                }
                showTotalPages
              />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};
