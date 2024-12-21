import { useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import clsx from 'clsx';

import { BookType } from '../../model/Book';
import { ChildrenFC } from '../../utils/type';
import { CurrentBookCard } from '../CurrentBookCard/CurrentBookCard';
import { Layout } from '../Layout/Layout';
import style from './BookLayout.module.scss';

const iconSx = { fontSize: 28 };

type BookLayoutProps = {
  currentlyReadingBook: BookType | undefined;
  searchQuery: string | null;
  setSearchQuery: (query: string) => void;
};

export const BookLayout: ChildrenFC<BookLayoutProps> = ({
  children,
  currentlyReadingBook,
  searchQuery,
  setSearchQuery,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
              data-testid="search-input"
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

          {children}
        </div>
      </div>
    </Layout>
  );
};
