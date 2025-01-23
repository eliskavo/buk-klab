import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ClubDetailCardWrapper } from '../ClubDetailCardWrapper/ClubDetailCardWrapper';
import { BookType } from '../../../model/Book';
import { getClubsCurrentBook } from '../../../api/clubsCurrentlyReading';
import { fetchBookDetails } from '../../../api/bookDetailApi';
import style from './CurrentlyReadingCard.module.scss';

type CurrentlyReadingCardProps = {
  clubId: number;
  title: string;
};

export const CurrentlyReadingCard: React.FC<CurrentlyReadingCardProps> = ({
  title,
  clubId,
}) => {
  const [currentBook, setCurrentBook] = useState<BookType | null>(null);

  useEffect(() => {
    const fetchCurrentBook = async () => {
      try {
        const data = await getClubsCurrentBook(clubId);
        if (data?.currentBookId) {
          const bookDetails = await fetchBookDetails({
            editionId: data.currentBookId,
          });
          setCurrentBook(bookDetails);
        }
      } catch (error) {
        console.error('Error fetching current book:', error);
      }
    };

    fetchCurrentBook();
  }, [clubId]);

  return (
    <ClubDetailCardWrapper title={title}>
      {currentBook ? (
        <Link to={`/books/${currentBook.id}`} className={style.bookInfo}>
          <img
            src={currentBook.cover}
            alt={currentBook.title}
            className={style.bookCover}
          />
          <div>
            <h1 className={style.bookTitle}>{currentBook.title}</h1>
            <h2 className={style.bookAuthor}>{currentBook.author}</h2>
            <p className={style.description}>
              {typeof currentBook.description === 'string'
                ? currentBook.description
                : currentBook.description?.value || 'No description available'}
            </p>
          </div>
        </Link>
      ) : (
        <p>No book selected</p>
      )}
    </ClubDetailCardWrapper>
  );
};
