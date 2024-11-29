import { Link } from 'react-router-dom';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import { Book } from '../../../types/types';
import style from './CurrentBookCard.module.scss';

type CurrentBookProps = {
  books: Book[];
};

export const CurrentBookCard: React.FC<CurrentBookProps> = ({ books }) => {
  const currentBook = books.find((book) => book.isCurrentlyReading);

  return (
    <div>
      {currentBook && (
        <div className={style.currentSection}>
          <div className={style.featured}>
            <Link
              className={style.coverWrapper}
              to={`/books/${currentBook.id}`}
            >
              <img
                src={currentBook.cover}
                alt={currentBook.title}
                className={style.currentCover}
              />
            </Link>
            <div className={style.currentInfo}>
              <Link
                className={style.currentTitle}
                to={`/books/${currentBook.id}`}
              >
                <h3>{currentBook.title}</h3>
              </Link>
              <p className={style.currentMeta}>
                {currentBook.author}, {currentBook.year}
              </p>
              <p className={style.currentDescription}>
                {currentBook.description}
              </p>
              <Link
                className={style.currentButton}
                aria-label={`View details for book: ${currentBook.title}`}
                to={`/books/${currentBook.id}`}
              >
                show more
                <ArrowForwardIosRoundedIcon sx={{ fontSize: 16 }} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
