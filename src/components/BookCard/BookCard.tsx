import { useNavigate } from 'react-router-dom';

import { Book } from '../../../types/types';
import style from './BookCard.module.scss';

type BooksProps = { book: Book };

export const BookCard: React.FC<BooksProps> = ({ book }: BooksProps) => {
  const navigate = useNavigate();
  const goToBookDetail = (bookId: number) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <section className={style.card}>
      <div
        className={style.cardCoverWrapper}
        onClick={() => goToBookDetail(book.id)}
      >
        <img src={book.cover} alt={book.title} />
        <div className={style.cardDescription}>{book.description}</div>
      </div>
      <div className={style.cardContent}>
        <h3 className={style.cardTitle} onClick={() => goToBookDetail(book.id)}>
          {book.title}
        </h3>
        <p className={style.cardAuthor}>{book.author}</p>
      </div>
    </section>
  );
};
