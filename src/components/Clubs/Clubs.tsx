import { ClubType } from '../../model/Club';
import style from './Clubs.module.scss';

type ClubProps = {
  club: ClubType;
};

export const Club = ({ club }: ClubProps) => (
  <div className={style.clubCard}>
    <img
      src={club.clubImage}
      alt={`${club.name} club`}
      className={style.clubImage}
    />
    <div className={style.clubContent}>
      <h3 className={style.clubName}>{club.name}</h3>
      <p className={style.memberCount}>9 members</p>
      <p className={style.description}>{club.description}</p>

      <div className={style.currentlyReading}>
        <p>currently reading</p>
      </div>
    </div>
  </div>
);
