import { BookCard } from '../../components/BookCard/BookCard';
import { Loading } from '../../components/Loading/Loading';
import { BookType } from '../../model/Book';
import style from './RecommendedBooks.module.scss';

type RecommendedBooksProps = {
  recommendedBooks: BookType[] | null;
};

export const RecommendedBooks: React.FC<RecommendedBooksProps> = ({
  recommendedBooks,
}) => {
  if (recommendedBooks === null) {
    return <Loading message="loading recommendations" />;
  }

  if (!recommendedBooks.length) {
    return null;
  }

  return (
    <section className={style.recommendedSection}>
      <h3 className={style.recommendedHeading}>you might also like</h3>
      <div className={style.bookGrid}>
        {recommendedBooks.map((recommendedBook) => (
          <BookCard key={recommendedBook.id} book={recommendedBook} />
        ))}
      </div>
    </section>
  );
};
