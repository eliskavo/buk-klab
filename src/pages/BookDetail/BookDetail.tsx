import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import { Layout } from '../../components/Layout/Layout';
import { BookCard } from '../../components/BookCard/BookCard';
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

export const BookDetail: React.FC = () => {
  const { id: queryId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null>(null);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [queryId]);

  const goBackToBooks = () => {
    navigate('/books');
  };

  // const formatDate = (dateString: string) =>
  //   new Date(dateString).toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //   });

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!queryId) {
        return;
      }

      try {
        setIsLoading(true);
        const bookResponse = await fetch(
          `https://openlibrary.org${queryId}.json`,
        );
        const bookData = await bookResponse.json();

        const authorKey = bookData.authors?.[0]?.key;
        let authorName = 'Unknown Author';
        if (authorKey) {
          const authorResponse = await fetch(
            `https://openlibrary.org${authorKey}.json`,
          );

          const authorData = await authorResponse.json();
          authorName = authorData.name || authorName;
        }

        const coverId = bookData.covers?.[0];
        const coverUrl = coverId
          ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
          : '';

        const bookDetails: Book = {
          id: queryId,
          title: bookData.title || 'Untitled',
          author: authorName,
          cover: coverUrl,
          description:
            typeof bookData.description === 'string'
              ? bookData.description
              : bookData.description?.value || 'No description available',
          year: bookData.first_publish_date
            ? new Date(bookData.first_publish_date).getFullYear()
            : 'Unknown',
          pages: bookData.number_of_pages || 'N/A',
          rating: Math.random() * 5,
          isCurrentlyReading: false,
        };

        setBook(bookDetails);

        const recommendedResponse = await fetch(
          `https://openlibrary.org/search.json?author=${encodeURIComponent(authorName)}&limit=5`,
        );
        const recommendedData = await recommendedResponse.json();
        const recommendedBooksData: Book[] = recommendedData.docs
          .filter((b: any) => b.key !== queryId)
          .slice(0, 5)
          .map((recommendedBook: any) => ({
            id: recommendedBook.key,
            title: recommendedBook.title,
            author: recommendedBook.author_name?.[0] || 'Unknown',
            cover: recommendedBook.cover_i
              ? `https://covers.openlibrary.org/b/id/${recommendedBook.cover_i}-M.jpg`
              : '',
            description: '',
            year: recommendedBook.first_publish_year || 'Unknown',
            pages: recommendedBook.number_of_pages_median || 'N/A',
            isCurrentlyReading: false,
            rating: Math.random() * 5,
          }));

        setRecommendedBooks(recommendedBooksData);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setBook(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [queryId]);

  if (isLoading) {
    return (
      <Layout>
        <div className={style.loading}>Loading book details...</div>
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
            <div>
              {/* <div className={style.bookDetailRating}> */}
              {rating !== undefined && <Stars rating={rating} />}
            </div>
            <p className={style.bookDetailDescription}>{description}</p>
            <div className={style.meta}>
              <span className={style.metaItem}>First published: {year}</span>
              <span className={style.metaItem}>{pages} Pages</span>
            </div>
          </div>
        </div>

        <section className={style.recommendedSection}>
          <h3 className={style.recommendedHeading}>you might also like</h3>
          <div className={style.bookGrid}>
            {recommendedBooks.map((recommendedBook) => (
              <BookCard key={recommendedBook.id} book={recommendedBook} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};
