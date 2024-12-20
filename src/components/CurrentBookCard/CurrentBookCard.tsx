import { Link } from 'react-router-dom';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import { BookType } from '../../model/Book';
import style from './CurrentBookCard.module.scss';

const iconSx = { fontSize: 16 };

type CurrentBookProps = {
  books: BookType[];
};

export const CurrentBookCard: React.FC<CurrentBookProps> = ({ books }) => {
  const currentBook = books.find((book) => book.isCurrentlyReading);

  if (!currentBook) {
    return null;
  }

  return (
    <div className={style.currentSection}>
      <div className={style.featured}>
        <Link className={style.coverWrapper} to={`/books/${currentBook.id}`}>
          <img
            src={currentBook.cover}
            alt={currentBook.title}
            className={style.currentCover}
          />
        </Link>
        <div className={style.currentInfo}>
          <Link className={style.currentTitle} to={`/books/${currentBook.id}`}>
            <h3>{currentBook.title}</h3>
          </Link>
          <p className={style.currentMeta}>
            {currentBook.author}, {currentBook.year}
          </p>
          <p className={style.currentDescription}>
            {typeof currentBook.description === 'string'
              ? currentBook.description
              : currentBook.description?.value}
          </p>
          <Link
            className={style.currentButton}
            aria-label={`View details for book: ${currentBook.title}`}
            to={`/books/${currentBook.id}`}
          >
            show more
            <ArrowForwardIosRoundedIcon sx={iconSx} />
          </Link>
        </div>
      </div>
    </div>
  );
};
