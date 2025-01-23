import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import { Layout } from '../../components/Layout/Layout';
import { BookType } from '../../model/Book';
import { NotFound } from '../../components/NotFound/NotFound';
import { fetchBookDetails } from '../../api/bookDetailApi';
import { fetchRecommendedBooks } from '../../api/recommendedBooksApi';
import { Loading } from '../../components/Loading/Loading';
import { RecommendedBooks } from './RecommendedBooks';
import { getDescriptionValue } from '../../utils/getDescriptionValue';
import { SecondaryButton } from '../../components/Button/SecondaryButton';
import { SelectClubDialog } from '../../components/ConfirmDialog/SelectClubDialog';
import style from './BookDetail.module.scss';

const iconSx = { fontSize: 16 };

export const BookDetail: React.FC = () => {
  const { id: editionId } = useParams();
  const [searchParams] = useSearchParams();
  const authorKey = searchParams.get('authorKey');
  const navigate = useNavigate();

  const [book, setBook] = useState<BookType | null>(null);
  const [recommendedBooks, setRecommendedBooks] = useState<BookType[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [editionId]);

  const goBackToBooks = () => {
    navigate('/books');
  };

  useEffect(() => {
    const fetchDetails = async () => {
      if (!editionId) {
        return;
      }

      try {
        const bookDetails = await fetchBookDetails({
          editionId,
          authorKey,
        });

        setBook(bookDetails);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [editionId]);

  useEffect(() => {
    const fetchRecommended = async () => {
      if (!book?.author) {
        return;
      }

      try {
        const recommendedBooksData = await fetchRecommendedBooks({
          authorName: book.author || '',
          editionId: editionId ?? '',
        });

        setRecommendedBooks(recommendedBooksData);
      } catch (error) {
        console.error('Error fetching recommended books:', error);
        setRecommendedBooks([]);
      }
    };

    fetchRecommended();
  }, [book?.author, editionId]);

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

  const { title, author, cover, description, year, pages } = book;

  return (
    <Layout>
      <div className={style.bookDetailSection}>
        <button
          onClick={goBackToBooks}
          className={style.backButton}
          aria-label="Back to books"
        >
          <ArrowBackIosRoundedIcon sx={iconSx} /> back to books
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
            <p className={style.bookDetailDescription}>
              {getDescriptionValue(description)}
            </p>

            <div className={style.meta}>
              <span className={style.metaItem}>First published: {year}</span>
              <span className={style.metaItem}>{pages} pages</span>
            </div>
            <section className={style.buttonSection}>
              <SecondaryButton
                type="button"
                onClick={() => setIsDialogOpen(true)}
              >
                set as currently reading
              </SecondaryButton>

              <SelectClubDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title="Select club"
                message="Choose a club to set this book as currently reading"
                closeButtonText="Cancel"
                confirmButtonText="Select"
                bookId={editionId ?? ''}
              />
            </section>
          </div>
        </div>

        {book.author && (
          <RecommendedBooks recommendedBooks={recommendedBooks} />
        )}
      </div>
    </Layout>
  );
};
