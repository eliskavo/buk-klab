import { useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import clsx from 'clsx';

import { Layout } from '../../components/Layout/Layout';
import { BookCard } from '../../components/BookCard/BookCard';
import { CurrentBookCard } from '../../components/CurrentBookCard/CurrentBookCard';
import mockbooks from '../../data/mockbooks.json';
import { Book } from '../../../types/types';
import style from './Books.module.scss';

export const Books: React.FC = () => {
  const books: Book[] = mockbooks;
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const currentlyReadingBook = books.find((book) => book.isCurrentlyReading);

  return (
    <Layout>
      <div className={style.bookSection}>
        <h1 className={style.currentReadingTitle}>we are currently reading</h1>
        {currentlyReadingBook && <CurrentBookCard books={books} />}
        <div className={style.searchSection}>
          <div className={style.searchHeader}>
            <h1 className={style.allBooksTitle}>discover our books</h1>

            {!isSearchOpen && (
              <button
                className={style.searchIcon}
                onClick={toggleSearch}
                aria-label="search books"
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
          <div className={style.bookGrid}>
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
