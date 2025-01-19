import style from './CurrentlyReading.module.scss';

type CurrentlyReadingCardProps = {
  title: string;
  text: string;
};

export const CurrentlyReadingCard: React.FC<CurrentlyReadingCardProps> = ({
  title,
  text,
}) => (
  <div className={`${style.card} ${style.inviteCard}`}>
    <h2 className={`${style.cardTitle} ${style.inviteCardTitle}`}>{title}</h2>
    <p className={`${style.cardText} ${style.inviteCardText}`}>{text}</p>
  </div>
);
