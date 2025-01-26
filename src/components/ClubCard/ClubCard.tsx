import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ClubType } from '../../model/Club';
import placeholder_club from '../../assets/images/placeholder_club.png';
import { BookType } from '../../model/Book';
import { getClubsCurrentBook } from '../../api/clubsCurrentlyReading';
import { fetchBookDetails } from '../../api/bookDetailApi';
import style from './ClubCard.module.scss';

type ClubProps = {
  club: ClubType;
};

export const ClubCard = ({ club }: ClubProps) => {
  const [currentBooks, setCurrentBooks] = useState<BookType[]>([]);

  useEffect(() => {
    const fetchCurrentBook = async () => {
      try {
        const booksData = await getClubsCurrentBook(club.id);

        if (booksData?.length) {
          const bookPromises = booksData.map((bookData) =>
            fetchBookDetails({
              editionId: bookData.currentBookId,
              authorKey: bookData.authorKey,
            }),
          );

          const books = await Promise.all(bookPromises);
          setCurrentBooks(books.filter((book) => book !== null));
        }
      } catch (error) {
        console.error('Error fetching current books:', error);
      }
    };

    fetchCurrentBook();
  }, [club.id]);

  const currentBook = currentBooks[0];

  return (
    <Link to={`/clubs/${club.id}`} className={style.link}>
      <div className={style.clubCard}>
        <img
          src={club.clubImage || placeholder_club}
          alt={`${club.name} club`}
          className={style.clubImage}
        />
        <div className={style.clubContent}>
          <h3 className={style.clubName}>{club.name}</h3>
          <p className={style.memberCount}>
            {club.memberCount} {club.memberCount === 1 ? 'member' : 'members'}
          </p>
          <p className={style.description}>{club.description}</p>

          {currentBook && (
            <div className={style.currentlyReading}>
              <p>currently reading</p>
              <div className={style.bookInfo}>
                <img
                  src={currentBook.cover}
                  alt={currentBook.title}
                  className={style.bookCover}
                />
                <div>
                  <p className={style.bookTitle}>{currentBook.title}</p>
                  <p className={style.bookAuthor}>{currentBook.author}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
