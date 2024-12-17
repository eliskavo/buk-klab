import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import { Layout } from '../../components/Layout/Layout';
import { BookType } from '../../model/Book';
import { NotFound } from '../../components/NotFound/NotFound';
import {
  fetchBookDetails,
  fetchRecommendedBooks,
} from '../../api/bookDetailApi';
import { StarsRating } from '../../components/StarsRating/StarsRating';
import { Loading } from '../../components/Loading/Loading';
import { RecommendedBooks } from './RecommendedBooks';
import style from './BookDetail.module.scss';

export const BookDetail: React.FC = () => {
  const { id: queryId } = useParams();
  const [searchParams] = useSearchParams();
  const authorKey = searchParams.get('authorKey') || '';
  const navigate = useNavigate();

  const [book, setBook] = useState<BookType | null>(null);
  const [recommendedBooks, setRecommendedBooks] = useState<BookType[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

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
        const bookDetails = await fetchBookDetails(queryId, authorKey);

        setBook(bookDetails);
      } catch (error) {
        console.error('Error fetching book details:', error);
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

      try {
        const recommendedBooksData = await fetchRecommendedBooks({
          authorName: book?.author || '',
          queryId: queryId ?? '',
        });

        setRecommendedBooks(recommendedBooksData || []);
      } catch (error) {
        console.error('Error fetching recommended books:', error);
        setRecommendedBooks([]);
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

        {book.author && (
          <RecommendedBooks recommendedBooks={recommendedBooks} />
        )}
      </div>
    </Layout>
  );
};
