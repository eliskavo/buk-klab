import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { ClubDetailCardWrapper } from '../ClubDetailCardWrapper/ClubDetailCardWrapper';
import { BookType } from '../../../model/Book';
import {
  getClubsCurrentBook,
  removeClubsCurrentBook,
} from '../../../api/clubsCurrentlyReading';
import { fetchBookDetails } from '../../../api/bookDetailApi';
import { Button } from '../../Button/Button';
import { ConfirmDialog } from '../../ConfirmDialog/ConfirmDialog';
import { Loading } from '../../Loading/Loading';
import { LinkButton } from '../../LinkButton/LinkButton';
import style from './CurrentlyReadingCard.module.scss';

type CurrentlyReadingCardProps = {
  clubId: number;
  title: string;
  isOwner: boolean;
};

export const CurrentlyReadingCard: React.FC<CurrentlyReadingCardProps> = ({
  title,
  clubId,
  isOwner,
}) => {
  const { id } = useParams<{ id: string }>();

  const [currentBooks, setCurrentBooks] = useState<BookType[]>([]);
  const [bookToRemove, setBookToRemove] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCurrentBooks = async () => {
      setIsLoading(true);

      const booksData = await getClubsCurrentBook(clubId);

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
      setIsLoading(false);
    };

    fetchCurrentBooks();
  }, [clubId]);

  const handleRemoveClick = (bookId: string) => {
    setBookToRemove(bookId);
  };

  const handleConfirmDelete = async () => {
    if (bookToRemove) {
      await removeClubsCurrentBook(clubId, bookToRemove);
      setCurrentBooks((prev) =>
        prev.filter((book) => book.id !== bookToRemove),
      );
      setBookToRemove(null);
    }
  };

  return (
    <ClubDetailCardWrapper title={title}>
      <div>
        {isLoading && <Loading message="loading books" />}

        {!currentBooks.length && (
          <div className={style.noBooksSection}>
            <p>No books selected</p>

            <LinkButton
              variant="secondary"
              to="/books"
              className={style.addButton}
            >
              Add books
            </LinkButton>
          </div>
        )}

        <ul className={style.booksList}>
          {currentBooks.map((book) => (
            <li key={book.id} className={style.bookItem}>
              <div className={style.bookContent}>
                <Link
                  to={`/books/${book.id}?clubId=${id}`}
                  className={style.bookInfo}
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className={style.bookCover}
                  />
                  <div>
                    <h1 className={style.bookTitle}>{book.title}</h1>
                    <h2 className={style.bookAuthor}>{book.author}</h2>
                    <p className={style.description}>
                      {typeof book.description === 'string'
                        ? book.description
                        : (book.description?.value ??
                          'No description available')}
                    </p>
                  </div>
                </Link>
                {isOwner && (
                  <Button
                    onClick={() => handleRemoveClick(book.id)}
                    className={style.removeButton}
                    variant="secondary"
                  >
                    remove
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ConfirmDialog
        isOpen={!!bookToRemove}
        onClose={() => setBookToRemove(null)}
        onConfirm={handleConfirmDelete}
        title="Remove book"
        message="Are you sure you want to remove this book from currently reading?"
        closeButtonText="Cancel"
        confirmButtonText="Remove"
      />
    </ClubDetailCardWrapper>
  );
};
