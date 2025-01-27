import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { BookType } from '../../../model/Book';
import { getMemberCurrentlyReadingBooks } from '../../../api/clubsCurrentlyReading';
import { fetchBookDetails } from '../../../api/bookDetailApi';
import { Loading } from '../../Loading/Loading';
import { ClubDetailCardWrapper } from '../../clubdetail/ClubDetailCardWrapper/ClubDetailCardWrapper';
import oops from '../../../assets/images/oops.png';
import style from './MemberCurrentlyReadingCard.module.scss';

type MemberCurrentlyReadingCardProps = {
  userId: string;
  title: string;
  isOwner: boolean;
};

export const MemberCurrentlyReadingCard: React.FC<
  MemberCurrentlyReadingCardProps
> = ({ userId, title }) => {
  const { id } = useParams<{ id: string }>();

  const [currentBooks, setCurrentBooks] = useState<BookType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCurrentBooks = async () => {
      setIsLoading(true);

      const booksData = await getMemberCurrentlyReadingBooks(userId);

      if (booksData.length) {
        const bookPromises = booksData.map((bookData) =>
          fetchBookDetails({
            editionId: bookData.currentBookId,
            authorKey: bookData.authorKey,
          }),
        );

        const books = await Promise.all(bookPromises);
        setCurrentBooks(books.filter((book) => book !== null));
      }
      setIsLoading(false);
    };

    fetchCurrentBooks();
  }, [userId]);

  return (
    <ClubDetailCardWrapper title={title}>
      <div>
        {isLoading && <Loading message="loading books" />}

        {!currentBooks.length && (
          <>
            <p>No books currently reading</p>
            <img src={oops} alt="" className={style.oopsIllustration} />
          </>
        )}

        <ul className={style.booksList}>
          {currentBooks.map((book) => (
            <li key={book.id} className={style.bookItem}>
              <div className={style.bookContent}>
                <Link
                  to={`/books/${book.id}?userId=${id}`}
                  className={style.bookInfo}
                  state={{ fromClubs: true, userId: id }}
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className={style.bookCover}
                  />
                  <div>
                    <h1 className={style.bookTitle}>{book.title}</h1>
                    <h2 className={style.bookAuthor}>{book.author}</h2>
                  </div>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ClubDetailCardWrapper>
  );
};
