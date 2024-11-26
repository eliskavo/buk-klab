import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import { Layout } from '../../components/Layout/Layout';
import { BookCard } from '../../components/BookCard/BookCard';
import mockbooks from '../../data/mockbooks.json';
import reviews from '../../data/reviews.json';
import { Book, Review } from '../../../types/types';
import style from './BookDetail.module.scss';

export const BookDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [bookReviews, setBookReviews] = useState<Review[]>([]);
  const books: Book[] = mockbooks;

  useEffect(() => {
    const foundBook = books.find((b) => b.id === Number(id));
    if (foundBook) {
      setBook(foundBook);
      const bookSpecificReviews = reviews.filter(
        (review) => review.bookId === Number(id),
      );
      setBookReviews(bookSpecificReviews);
    }
  }, [id]);

  const goBackToBooks = () => {
    navigate('/books');
  };

  const goToBookDetail = (bookId: number) => {
    navigate(`/books/${bookId}`);
  };

  if (!book) {
    return <div>Book not found</div>;
  }

  const renderStars = (rating: number) => {
    const roundedRating = Math.round(rating * 2) / 2;

    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`${style.star} ${index < roundedRating ? style.filled : style.empty}`}
      >
        ★
      </span>
    ));
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <Layout>
      <div className={style.pageSection}>
        <button onClick={goBackToBooks} className={style.backButton}>
          <ArrowBackIosRoundedIcon sx={{ fontSize: 16 }} /> back to books
        </button>
        <div className={style.bookInfo}>
          <div className={style.bookCover}>
            <img src={book.cover} alt={book.title} />
          </div>
          <div className={style.bookContent}>
            <h1 className={style.title}>{book.title}</h1>
            <h2 className={style.author}>{book.author}</h2>
            <div className={style.rating}>
              {book.rating !== undefined && renderStars(book.rating)}
            </div>
            <p className={style.description}>{book.description}</p>
            <div className={style.meta}>
              <span>First published: {book.year}</span>
              <span>{book.pages} Pages: </span>
            </div>
          </div>
        </div>

        <section className={style.reviews}>
          <h3>reviews</h3>
          {bookReviews.length ? (
            bookReviews.map((review) => (
              <div key={review.id} className={style.review}>
                <div className={style.reviewHeader}>
                  <div className={style.reviewerInfo}>
                    <span className={style.reviewerName}>
                      {review.reviewerName}
                    </span>
                    <span className={style.reviewDate}>
                      {formatDate(review.reviewDate)}
                    </span>
                  </div>
                  <div className={style.rating}>
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className={style.reviewText}>{review.reviewText}</p>
              </div>
            ))
          ) : (
            <p className={style.noReviews}>no reviews yet for this book...</p>
          )}
        </section>

        <section className={style.recommended}>
          <h3>you might also like</h3>
          <div className={style.bookGrid}>
            {books
              .filter((b) => b.id !== book.id)
              .slice(0, 4)
              .map((recommendedBook) => (
                <div
                  key={recommendedBook.id}
                  onClick={() => goToBookDetail(recommendedBook.id)}
                >
                  <BookCard book={recommendedBook} />
                </div>
              ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};
