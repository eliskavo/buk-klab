import { useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import { Layout } from '../../components/Layout/Layout';
import { BookCard } from '../../components/BookCard/BookCard';
import mockbooks from '../../data/mockbooks.json';
import reviews from '../../data/reviews.json';
import { Book } from '../../../types/types';
import { NotFound } from '../../components/NotFound/NotFound';
import style from './BookDetail.module.scss';

const Stars = ({ rating }: { rating: number }) => {
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

const books: Book[] = mockbooks;

export const BookDetail: React.FC = () => {
  const { id: queryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [queryId]);

  const goBackToBooks = () => {
    navigate('/books');
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const book = useMemo(
    () => books.find((b) => b.id === Number(queryId)),
    [queryId],
  );

  const bookReviews = useMemo(
    () =>
      book?.id
        ? reviews.filter((review) => review.bookId === Number(book.id))
        : [],
    [book?.id],
  );

  if (!book) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  const { id, title, author, cover, description, year, pages, rating } = book;

  return (
    <Layout>
      <div className={style.bookDetailSection}>
        <button onClick={goBackToBooks} className={style.backButton}>
          <ArrowBackIosRoundedIcon sx={{ fontSize: 16 }} /> back to books
        </button>
        <div className={style.bookInfo}>
          <div className={style.bookDetailCover}>
            <img className={style.bookCover} src={cover} alt={title} />
          </div>
          <div>
            <h1 className={style.bookContentTitle}>{title}</h1>
            <h2 className={style.bookContentAuthor}>{author}</h2>
            <div className={style.bookDetailRating}>
              {rating !== undefined && <Stars rating={rating} />}
            </div>
            <p className={style.bookDetailDescription}>{description}</p>
            <div className={style.meta}>
              <span className={style.metaItem}>First published: {year}</span>
              <span className={style.metaItem}>{pages} Pages: </span>
            </div>
          </div>
        </div>

        <section className={style.reviewsSection}>
          <div className={style.reviewHeader}>
            <h3 className={style.reviewHeading}>what our members say</h3>
            <span className={style.line} />
          </div>
          {bookReviews.length ? (
            bookReviews.map((review) => (
              <div key={review.id} className={style.bookReview}>
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
                    <Stars rating={review.rating} />
                  </div>
                </div>
                <p className={style.reviewText}>{review.reviewText}</p>
              </div>
            ))
          ) : (
            <p className={style.noReviews}>no reviews yet for this book...</p>
          )}
        </section>

        <section className={style.recommendedSection}>
          <h3 className={style.recommendedHeading}>you might also like</h3>
          <div className={style.bookGrid}>
            {books
              .filter((innerBook) => innerBook.id !== Number(id))
              .slice(0, 5)
              .map((recommendedBook) => (
                <BookCard book={recommendedBook} />
              ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};
