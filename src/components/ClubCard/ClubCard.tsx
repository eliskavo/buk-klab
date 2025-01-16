import { Link } from 'react-router-dom';

import { ClubType } from '../../model/Club';
import placeholder_club from '../../assets/images/placeholder_club.png';
import style from './ClubCard.module.scss';

type ClubProps = {
  club: ClubType;
};

export const ClubCard = ({ club }: ClubProps) => (
  <Link to={`/clubs/${club.id}`} className={style.link}>
    <div className={style.clubCard}>
      <img
        src={club.clubImage || placeholder_club}
        alt={`${club.name} club`}
        className={style.clubImage}
      />
      <div className={style.clubContent}>
        <h3 className={style.clubName}>{club.name}</h3>
        <p className={style.memberCount}>N/A members</p>
        <p className={style.description}>{club.description}</p>

        <div className={style.currentlyReading}>
          <p>currently reading</p>
        </div>
      </div>
    </div>
  </Link>
);
