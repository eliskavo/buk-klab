import style from './StarsRating.module.scss';

export const Stars = ({ rating }: { rating: number }) => {
  const roundedRating = Math.round(rating * 2) / 2;

  return [...Array(5)].map((_, index) => (
    <span
      key={index}
      className={`${style.star} ${index < roundedRating ? style.starFilled : style.starEmpty}`}
    >
      ★
    </span>
  ));
};
