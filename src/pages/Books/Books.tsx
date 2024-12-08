import { useState, useEffect } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRight';
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
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [currentTrendingPage, setCurrentTrendingPage] = useState(1);
  const [totalSearchBooks, setTotalSearchBooks] = useState(0);
  const [totalTrendingBooks, setTotalTrendingBooks] = useState(0);
  const booksPerPage = 30;

  const fetchBooks = async (query: string, page: number = 1) => {
    try {
      setIsLoading(true);
      const offset = (page - 1) * booksPerPage;

      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}&fields=key,title,author_name,cover_i,editions,editions.key,editions.title,editions.cover_i&lang=eng,cze&limit=${booksPerPage}&offset=${offset}`,
      );
      const data = await response.json();
      console.log('Fetched books:', data);

      setTotalSearchBooks(data.num_found);

      const booksData = data.docs.map((book: any) => {
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

      console.log('Processed books:', booksData);
      setBooks(booksData);
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrendingBooks = async (page: number = 1) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://openlibrary.org/trending/weekly.json?fields=key,title,author_name,cover_i,editions,editions.key,editions.title,editions.cover_i&limit=${booksPerPage}&offset=${(page - 1) * booksPerPage}`,
      );
      const data = await response.json();
      console.log('Fetched trending books:', data);

      setTotalTrendingBooks(data.works.length);

      const booksData = data.works.slice(0, booksPerPage).map((book: any) => {
        const edition = book.editions?.docs?.[0] || book;

        return {
          id: parseBookId(edition.key || book.key),
          title: edition.title || book.title,
          author: book.author_name ? book.author_name[0] : 'Unknown',
          cover: edition.cover_i
            ? `https://covers.openlibrary.org/b/id/${edition.cover_i}-M.jpg`
            : '',
        };
      });

      console.log('Processed trending books:', booksData);
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
      setCurrentSearchPage(1);
      fetchBooks(searchQuery, 1);
    } else {
      setBooks([]);
      setTotalSearchBooks(0);
    }
  }, [searchQuery]);

  const handleNextSearchPage = () => {
    if (currentSearchPage * booksPerPage < totalSearchBooks) {
      const nextPage = currentSearchPage + 1;
      setCurrentSearchPage(nextPage);
      fetchBooks(searchQuery, nextPage);
    }
  };

  const handlePreviousSearchPage = () => {
    if (currentSearchPage > 1) {
      const prevPage = currentSearchPage - 1;
      setCurrentSearchPage(prevPage);
      fetchBooks(searchQuery, prevPage);
    }
  };

  const handleNextTrendingPage = () => {
    const nextPage = currentTrendingPage + 1;
    setCurrentTrendingPage(nextPage);
    fetchTrendingBooks(nextPage);
  };

  const handlePreviousTrendingPage = () => {
    if (currentTrendingPage > 1) {
      const prevPage = currentTrendingPage - 1;
      setCurrentTrendingPage(prevPage);
      fetchTrendingBooks(prevPage);
    }
  };

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
            <>
              <div className={style.bookGrid}>
                {searchQuery
                  ? books.map((book) => <BookCard key={book.id} book={book} />)
                  : trendingBooks.map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
              </div>

              {searchQuery && totalSearchBooks > 0 && (
                <div className={style.pagination}>
                  <button
                    onClick={handlePreviousSearchPage}
                    disabled={currentSearchPage === 1}
                    className={style.paginationButton}
                  >
                    <ChevronLeftRoundedIcon />
                  </button>
                  <span className={style.pageInfo}>
                    Page {currentSearchPage} of{' '}
                    {Math.ceil(totalSearchBooks / booksPerPage)}
                  </span>
                  <button
                    onClick={handleNextSearchPage}
                    disabled={
                      currentSearchPage * booksPerPage >= totalSearchBooks
                    }
                    className={style.paginationButton}
                  >
                    <ChevronRightRoundedIcon />
                  </button>
                </div>
              )}
              {!searchQuery && (
                <div className={style.pagination}>
                  <button
                    onClick={handlePreviousTrendingPage}
                    disabled={currentTrendingPage === 1}
                    className={style.paginationButton}
                  >
                    <ChevronLeftRoundedIcon />
                  </button>
                  <span className={style.pageInfo}>
                    Page {currentTrendingPage}
                  </span>
                  <button
                    onClick={handleNextTrendingPage}
                    disabled={
                      currentTrendingPage * booksPerPage >= totalTrendingBooks
                    }
                    className={style.paginationButton}
                  >
                    <ChevronRightRoundedIcon />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};
