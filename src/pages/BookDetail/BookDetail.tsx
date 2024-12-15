import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import { Layout } from '../../components/Layout/Layout';
import { BookCard } from '../../components/BookCard/BookCard';
import { Book } from '../../model/Book';
import { NotFound } from '../../components/NotFound/NotFound';
import {
  fetchBookDetails,
  fetchRecommendedBooks,
} from '../../api/bookDetailApi';
import { StarsRating } from '../../components/StarsRating/StarsRating';
import { Loading } from '../../components/Loading/Loading';
import style from './BookDetail.module.scss';

export const BookDetail: React.FC = () => {
  const { id: queryId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null>(null);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecommendedLoading, setIsRecommendedLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [queryId]);

  const goBackToBooks = () => {
    navigate('/books');
  };

  useEffect(() => {
    const fetchDetails = async () => {
      if (!queryId) {
        return;
      }

      try {
        const bookDetails = await fetchBookDetails(queryId);
        if (bookDetails) {
          setBook(bookDetails);
          setIsLoading(false);
        } else {
          setBook(null);
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
        setBook(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [queryId]);

  useEffect(() => {
    const fetchRecommended = async () => {
      if (!book?.author) {
        return;
      }

      setIsRecommendedLoading(true);
      try {
        const recommendedBooksData = await fetchRecommendedBooks({
          authorName: book.author,
          queryId: queryId ?? '',
        });
        setRecommendedBooks(recommendedBooksData);
      } catch (error) {
        console.error('Error fetching recommended books:', error);
        setRecommendedBooks([]);
      } finally {
        setIsRecommendedLoading(false);
      }
    };

    fetchRecommended();
  }, [book?.author, queryId]);

  if (isLoading) {
    return (
      <Layout>
        <Loading message="loading book details" />
      </Layout>
    );
  }

  if (!book) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  const { title, author, cover, description, year, pages, rating } = book;

  return (
    <Layout>
      <div className={style.bookDetailSection}>
        <button
          onClick={goBackToBooks}
          className={style.backButton}
          aria-label="Back to books"
        >
          <ArrowBackIosRoundedIcon sx={{ fontSize: 16 }} /> back to books
        </button>
        <div className={style.bookInfo}>
          <div className={style.bookDetailCover}>
            <img
              className={style.bookCover}
              src={cover}
              alt={`cover of ${title}`}
            />
          </div>
          <div>
            <h1 className={style.bookContentTitle}>{title}</h1>
            <h2 className={style.bookContentAuthor}>{author}</h2>
            <div>{rating !== undefined && <StarsRating rating={rating} />}</div>
            <p className={style.bookDetailDescription}>{description}</p>
            <div className={style.meta}>
              <span className={style.metaItem}>First published: {year}</span>
              <span className={style.metaItem}>{pages} pages</span>
            </div>
          </div>
        </div>
        {isRecommendedLoading ? (
          <Loading message="loading recommendations" />
        ) : (
          recommendedBooks.length > 0 && (
            <section className={style.recommendedSection}>
              <h3 className={style.recommendedHeading}>you might also like</h3>
              <div className={style.bookGrid}>
                {recommendedBooks.map((recommendedBook) => (
                  <BookCard key={recommendedBook.id} book={recommendedBook} />
                ))}
              </div>
            </section>
          )
        )}
      </div>
    </Layout>
  );
};
