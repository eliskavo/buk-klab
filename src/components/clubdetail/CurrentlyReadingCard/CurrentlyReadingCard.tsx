import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ClubDetailCardWrapper } from '../ClubDetailCardWrapper/ClubDetailCardWrapper';
import { BookType } from '../../../model/Book';
import {
  getClubsCurrentBook,
  removeClubsCurrentBook,
} from '../../../api/clubsCurrentlyReading';
import { fetchBookDetails } from '../../../api/bookDetailApi';
import { SecondaryButton } from '../../Button/SecondaryButton';
import { ConfirmDialog } from '../../ConfirmDialog/ConfirmDialog';
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
  const [currentBooks, setCurrentBooks] = useState<BookType[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [bookToRemove, setBookToRemove] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentBooks = async () => {
      try {
        const booksData = await getClubsCurrentBook(clubId);

        if (booksData.length > 0) {
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

    fetchCurrentBooks();
  }, [clubId]);

  const handleRemoveClick = (bookId: string) => {
    setBookToRemove(bookId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (bookToRemove) {
      try {
        await removeClubsCurrentBook(clubId, bookToRemove);
        setCurrentBooks((prev) =>
          prev.filter((book) => book.id !== bookToRemove),
        );
        setIsDeleteDialogOpen(false);
        setBookToRemove(null);
      } catch (error) {
        console.error('Error removing book:', error);
      }
    }
  };

  return (
    <ClubDetailCardWrapper title={title}>
      <div>
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <ul key={book.id} className={style.booksList}>
              <li className={style.bookItem}>
                <div className={style.bookContent}>
                  <Link to={`/books/${book.id}`} className={style.bookInfo}>
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
                    <SecondaryButton
                      onClick={() => handleRemoveClick(book.id)}
                      className={style.removeButton}
                    >
                      remove
                    </SecondaryButton>
                  )}
                </div>
              </li>
            </ul>
          ))
        ) : (
          <p>No books selected</p>
        )}
      </div>
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Remove book"
        message="Are you sure you want to remove this book from currently reading?"
        closeButtonText="Cancel"
        confirmButtonText="Remove"
      />
    </ClubDetailCardWrapper>
  );
};
