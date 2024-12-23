import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { BookType } from '../../model/Book';
import { ChildrenFC } from '../../utils/type';
import { CurrentBookCard } from '../CurrentBookCard/CurrentBookCard';
import { Layout } from '../Layout/Layout';
import style from './BookLayout.module.scss';

const iconSx = { fontSize: 28 };

type BookLayoutProps = {
  currentlyReadingBook: BookType | undefined;
  searchQuery: string | null;
  handleSearchUpdate: (query: string) => void;
};

export const BookLayout: ChildrenFC<BookLayoutProps> = ({
  children,
  currentlyReadingBook,
  searchQuery,
  handleSearchUpdate,
}) => (
  <Layout>
    <div className={style.bookSection}>
      {currentlyReadingBook && (
        <div>
          <h1 className={style.currentReadingTitle}>
            We are currently reading:
          </h1>
          <CurrentBookCard books={[currentlyReadingBook]} />
        </div>
      )}

      <div className={style.searchSection}>
        <div className={style.searchHeader}>
          <h1 className={style.searchTitle}>discover our books</h1>
          <div className={style.searchContainer}>
            <input
              type="text"
              placeholder="search books by title or author"
              className={style.searchInput}
              value={searchQuery || ''}
              onChange={(e) => handleSearchUpdate(e.target.value)}
              aria-label="Search books"
            />
            <SearchRoundedIcon className={style.searchIcon} sx={iconSx} />
          </div>
        </div>

        {children}
      </div>
    </div>
  </Layout>
);
