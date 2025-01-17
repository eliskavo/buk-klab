import { Link } from 'react-router-dom';

import { BookType } from '../../model/Book';
import style from './BookCard.module.scss';

type BooksProps = { book: BookType };

export const BookCard: React.FC<BooksProps> = ({
  book: { id, cover, title, author, authorKey },
}) => (
  <Link
    key={id}
    className={style.bookCard}
    to={`/books/${id}?authorKey=${authorKey || ''}`}
  >
    <section className={style.card}>
      <div className={style.cardCoverWrapper}>
        <img src={cover} className={style.cardCover} alt={title} />
      </div>
      <div className={style.cardContent}>
        <h3 className={style.cardTitle}>{title}</h3>
        <p className={style.cardAuthor}>{author}</p>
      </div>
    </section>
  </Link>
);
