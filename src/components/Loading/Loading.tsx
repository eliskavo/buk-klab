import search from '../../assets/images/search.png';
import style from './Loading.module.scss';

type LoadingProps = {
  message?: string;
};

export const Loading: React.FC<LoadingProps> = ({ message }) => (
  <div className={style.loadingContainer}>
    <div className={style.loadingText}>
      {message}
      <span className={style.dots}>
        <span className={style.dot}>.</span>
        <span className={style.dot}>.</span>
        <span className={style.dot}>.</span>
      </span>
    </div>
    <img src={search} alt="Loading books" className={style.illustration} />
  </div>
);
