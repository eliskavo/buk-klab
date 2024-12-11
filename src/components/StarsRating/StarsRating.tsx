import style from './StarsRating.module.scss';

type StarsProps = {
  rating: number;
  maxStars?: number;
};

export const Stars = ({ rating, maxStars = 5 }: StarsProps) => {
  const roundedRating = Math.min(
    Math.max(Math.round(rating * 2) / 2, 0),
    maxStars,
  );

  return Array.from({ length: maxStars }, (_, i) => (
    <span
      key={`star-${i}`}
      className={`${style.star} ${
        i < roundedRating ? style.starFilled : style.starEmpty
      }`}
      aria-label={i < roundedRating ? 'filled star' : 'empty star'}
    >
      ★
    </span>
  ));
};
