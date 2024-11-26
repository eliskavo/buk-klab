import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useNavigate } from 'react-router-dom';

import { Book } from '../../../types/types';
import style from './CurrentBookCard.module.scss';

type CurrentBookProps = {
  books: Book[];
};

export const CurrentBookCard: React.FC<CurrentBookProps> = ({ books }) => {
  const currentBook = books.find((book) => book.isCurrentlyReading);

  const navigate = useNavigate();

  const goToCurrentBookDetail = () => {
    if (currentBook) {
      navigate(`/books/${currentBook.id}`);
    }
  };

  return (
    <div className={style.currentSection}>
      {currentBook && (
        <div className={style.featured}>
          <div className={style.coverWrapper} onClick={goToCurrentBookDetail}>
            <img
              src={currentBook.cover}
              alt={currentBook.title}
              className={style.currentCover}
            />
          </div>
          <div className={style.currentInfo}>
            <h3 className={style.currentTitle} onClick={goToCurrentBookDetail}>
              {currentBook.title}
            </h3>
            <p className={style.currentMeta}>
              {currentBook.author}, {currentBook.year}
            </p>
            <p className={style.currentDescription}>
              {currentBook.description}
            </p>
            <button
              className={style.currentButton}
              onClick={goToCurrentBookDetail}
            >
              show more
              <ArrowForwardIosRoundedIcon sx={{ fontSize: 16 }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
