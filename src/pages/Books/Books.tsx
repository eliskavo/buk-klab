import { useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

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
      <div className={style.pageSection}>
        <h2 className={style.currentReadingTitle}>We are currently reading:</h2>
        {currentlyReadingBook && (
          <div>
            <CurrentBookCard books={books} />
          </div>
        )}
        <div className={style.searchSection}>
          <div className={style.searchHeader}>
            <h2>discover our books</h2>
            {!isSearchOpen && (
              <button className={style.searchIcon} onClick={toggleSearch}>
                <SearchRoundedIcon sx={{ fontSize: 28 }} />
              </button>
            )}
            <input
              type="text"
              placeholder="search books..."
              className={`${style.searchInput} ${isSearchOpen ? style.searchInputOpen : ''}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          <div className={style.bookGrid}>
            {filteredBooks.map((book) => (
              <div>
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
