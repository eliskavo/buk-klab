import { Link } from 'react-router-dom';

import { Book } from '../../../types/types';
import style from './BookCard.module.scss';

type BooksProps = { book: Book };

export const BookCard: React.FC<BooksProps> = ({
  book: { id, cover, title, description, author },
}) => (
  <Link key={id} className={style.bookCard} to={`/books/${id}`}>
    <section className={style.card}>
      <div className={style.cardCoverWrapper}>
        <img src={cover} alt={title} />
        <div className={style.cardDescription}>{description}</div>
      </div>

      <div className={style.cardContent}>
        <h3 className={style.cardTitle}>{title}</h3>
        <p className={style.cardAuthor}>{author}</p>
      </div>
    </section>
  </Link>
);
